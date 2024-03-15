import { auth, db } from "./firebase.js";

const Profile = {
    template: "#s_profile",
    data() {
        return {
            email: this.$root.user.email,
            emailError: '',
            formMessage: '',
        }
    },
    methods: {
        updatePassword() {
            if(!this.email) {
                this.emailError = 'Preencha o campo de e-mail';
                return;
            }

            auth.sendPasswordResetEmail(this.email).then(() => {
                this.formMessage = 'E-mail enviado com sucesso';
            }).catch((error) => {
                console.error('Erro ao enviar email:', error);
                this.emailError = error.message;
            });
        }
    }
}

const FormTopic = {
    template: '#s_form_topic',
    data() {
        return {
            topicTitle: '',
            titleError: '',
        };
    },
    methods: {
        async addTopic() {
            try {
                if (!this.topicTitle) {
                    this.titleError = 'Preencha o título';
                    return;
                }

                const querySnapshot = await db.collection('topics').where('title', '==', this.topicTitle).get();
                if (querySnapshot.size > 0) {
                    this.titleError = 'Esse tópico já existe';
                    return;
                }

                await db.collection('topics').add({
                    id: this.topicTitle.toLowerCase().replace(/ /g, '-'),
                    title: this.topicTitle,
                    contents: [],
                    created_at: new Date(),
                });

                this.topicTitle = '';
                this.titleError = '';
                this.$root.fetchTopics();
            } catch (error) {
                console.error('Erro ao adicionar tópico:', error);
                this.titleError = error.message;
            }
        }
    }
};

const FormContent = {
    template: "#s_add_content",
    data() {
        return {
            topicError: '',
            contentDescriptionError: '',
            contentDescription: '',
            contentLinkError: '',
            contentLink: '',
            contentTitleError: '',
            contentTitle: '',
            contentTopicId: this.$route.params.id,
        };
    },
    methods: {
        async addContent() {
            try {
                if (!this.contentTitle) {
                    this.contentTitleError = 'Preencha o título';
                    return;
                }

                if (!this.contentLink) {
                    this.contentLinkError = 'Preencha o link';
                    return;
                }

                const urlRegex = /^(http|https):\/\//i;
                if (!urlRegex.test(this.contentLink)) {
                    this.contentLinkError = 'Inicie o link com http:// ou https://';
                    return;
                }

                if (!this.contentDescription) {
                    this.contentDescriptionError = 'Preencha a descrição';
                    return;
                }

                const topicId = this.$route.params.id;
                const topicRef = db.collection('topics').doc(topicId);
                const doc = await topicRef.get();

                if (!doc.exists) {
                    this.topicError = 'Esse tópico não existe';
                    return;
                }

                const topicData = doc.data();
                topicData.contents.push({
                    id: Date.now().toString(36),
                    description: this.contentDescription,
                    link: this.contentLink,
                    title: this.contentTitle,
                });

                await topicRef.update({ contents: topicData.contents });
                this.$router.push(`/topic/${topicId}`);

                this.clearFields();
            } catch (error) {
                console.error('Erro ao adicionar conteúdo:', error);
                this.topicError = error.message;
            }
        },
        clearFields() {
            this.topicError = '';
            this.contentDescription = '';
            this.contentDescriptionError = '';
            this.contentTitle = '';
            this.contentTitleError = '';
            this.contentLink = '';
            this.contentLinkError = '';
        }
    }
};

const Login = {
    template: '#s_login',
    data() {
        return {
            email: '',
            password: '',
            loginError: ''
        };
    },
    methods: {
        async loginUser() {
            try {
                if (!this.email || !this.password) {
                    this.loginError = 'Preencha todos os campos';
                    return;
                }

                const user = await auth.signInWithEmailAndPassword(this.email, this.password);
                this.$root.user = user;
                this.$router.push('/');
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                this.loginError = error.message;
            }
        }
    }
};

const Home = {
    template: '#s_inicio'
};

const Topic = {
    template: "#s_topic",
    data() {
        return {
            id: '',
            title: '',
            contents: [],
            user: null,
        };
    },
    methods: {
        async loadTopic(topicId) {
            try {
                const doc = await db.collection('topics').doc(topicId).get();
                if (doc.exists) {
                    const topicData = doc.data();
                    this.id = topicId;
                    this.title = topicData.title;
                    this.contents = topicData.contents;
                } else {
                    this.$router.push('/');
                }
            } catch (error) {
                console.error('Erro ao carregar tópico:', error);
            }
        },
        async deleteContent(id) {
            try {
                const topicId = this.$route.params.id;
                const topicRef = db.collection('topics').doc(topicId);
                const doc = await topicRef.get();

                if (!doc.exists) {
                    this.$router.push('/');
                    return;
                }

                const topicData = doc.data();
                const newContents = topicData.contents.filter(content => content.id !== id);
                await topicRef.update({ contents: newContents });
            } catch (error) {
                console.error('Erro ao deletar conteúdo:', error);
            }
        },
        async deleteTopic(id) {
            try {
                await db.collection('topics').doc(id).delete();
                this.$root.fetchTopics();
                this.$router.push('/');
            } catch (error) {
                console.error('Erro ao deletar tópico:', error);
            }
        }
    },
    created() {
        const topicId = this.$route.params.id;
        this.loadTopic(topicId);

        db.collection('topics').doc(topicId).onSnapshot((doc) => {
            const topicData = doc.data();
            this.title = topicData.title;
            this.contents = topicData.contents;
        });

        this.user = this.$root.user;
    },
    watch: {
        '$route.params.id': function (newId) {
            this.loadTopic(newId);
        }
    }
};

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
    { path: '/topic-form', component: FormTopic },
    { path: '/topic/:id', component: Topic, props: true },
    { path: '/topic/:id/content-form', component: FormContent },
];

const router = new VueRouter({ routes });

const app = new Vue({
    router,
    data() {
        return {
            topics: [],
            user: null,
            loading: true,
        };
    },
    methods: {
        async logoutUser() {
            try {
                await auth.signOut();
                this.user = null;
                this.$router.push('/');
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
            }
        },
        async fetchTopics() {
            try {
                this.loading = true;
                const querySnapshot = await db.collection('topics').get();
                this.topics = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                }));
                this.loading = false;
            } catch (error) {
                console.error('Erro ao carregar tópicos:', error);
            }
        },
    },
    async created() {
        try {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    this.user = user;
                }
            });
            await this.fetchTopics();
            this.loading = false;
        } catch (error) {
            console.error('Erro durante a inicialização:', error);
        }
    }
}).$mount('#app');
