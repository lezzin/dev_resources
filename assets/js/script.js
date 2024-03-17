import { auth, db } from "./firebase.js";

// Common error messages
const ERROR_MESSAGES = {
    "requiredEmail": "Preencha o campo de e-mail",
    "requiredPassword": "Preencha o campo de senha",
    "auth/invalid-credential": "Email ou senha inválidos",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde",
    "topicExists": "Esse tópico já existe",
    "requiredLink": "Preencha o link",
    "invalidLink": "Inicie o link com http:// ou https://",
    "requiredTitle": "Preencha o título",
    "requiredDescription": "Preencha a descrição",
    "topicNotFound": "Esse tópico não existe",
    "loadTopicError": "Erro ao carregar tópico. Recarregue a página",
    "deleteContentError": "Erro ao deletar conteúdo. Recarregue a página",
    "deleteTopicError": "Erro ao deletar tópico. Recarregue a página",
    "logoutError": "Erro ao deslogar, se o erro persistir, recarregue a página",
    "fetchTopicsError": "Erro ao carregar tópicos",
};

// Vue component for user profile
const Profile = {
    template: "#s_profile",
    data() {
        return {
            email: this.$root.user.email,
            emailError: '',
            formMessage: '',
        };
    },
    methods: {
        updatePassword() {
            if (!this.email) {
                this.emailError = ERROR_MESSAGES.requiredEmail;
                return;
            }
            auth.sendPasswordResetEmail(this.email)
                .then(() => {
                    this.formMessage = 'E-mail enviado com sucesso';
                })
                .catch((error) => {
                    this.emailError = error.message;
                });
        },
    },
    created() {
        if (!this.$root.user) {
            this.$router.push('/');
        }
    },
};

// Vue component for adding a topic
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
                    this.titleError = ERROR_MESSAGES.requiredTitle;
                    return;
                }
                const querySnapshot = await db.collection('topics').where('title', '==', this.topicTitle).get();
                if (querySnapshot.size > 0) {
                    this.titleError = ERROR_MESSAGES.topicExists;
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
                this.$root.toast = { type: 'success', text: 'Tópico adicionado com sucesso' };
            } catch (error) {
                this.titleError = error.message;
            }
        },
    },
    created() {
        if (!this.$root.user) {
            this.$router.push('/');
        }
    }
};

// Vue component for editing a topic
const formEditTopic = {
    template: "#s_edit_topic",
    data() {
        return {
            topicTitle: '',
            titleError: '',
        };
    },
    methods: {
        async loadTopic() {
            try {
                const doc = await db.collection('topics').doc(this.$route.params.id).get();
                if (doc.exists) {
                    const topicData = doc.data();
                    this.topicTitle = topicData.title;
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                this.titleError = error.message;
            }
        },
        async editTopic() {
            try {
                if (!this.topicTitle) {
                    this.titleError = ERROR_MESSAGES.requiredTitle;
                    return;
                }
                const querySnapshot = await db.collection('topics').where('title', '==', this.topicTitle).get();
                if (querySnapshot.size > 0) {
                    this.titleError = ERROR_MESSAGES.topicExists;
                    return;
                }
                await db.collection('topics').doc(this.$route.params.id).update({ title: this.topicTitle });
                this.topicTitle = '';
                this.titleError = '';
                this.$router.push(`/topic/${this.$route.params.id}`);
            } catch (error) {
                this.titleError = error.message;
            }
        },
    },
    created() {
        if (!this.$root.user) {
            this.$router.push('/');
            return;
        }

        this.loadTopic();
    },
};

// Vue component for adding content to a topic
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
                    this.contentTitleError = ERROR_MESSAGES.requiredTitle;
                    return;
                }
                if (!this.contentLink) {
                    this.contentLinkError = ERROR_MESSAGES.requiredLink;
                    return;
                }
                const urlRegex = /^(http|https):\/\//i;
                if (!urlRegex.test(this.contentLink)) {
                    this.contentLinkError = ERROR_MESSAGES.invalidLink;
                    return;
                }
                if (!this.contentDescription) {
                    this.contentDescriptionError = ERROR_MESSAGES.requiredDescription;
                    return;
                }
                const topicId = this.$route.params.id;
                const topicRef = db.collection('topics').doc(topicId);
                const doc = await topicRef.get();
                if (!doc.exists) {
                    this.topicError = ERROR_MESSAGES.topicNotFound;
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
        },
    },
    created() {
        if (!this.$root.user) {
            this.$router.push('/');
            return;
        }
    },
};

// Vue component for editing content in a topic
const formEditContent = {
    template: "#s_edit_content",
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
        async loadContent() {
            try {
                const topicId = this.$route.params.id;
                const contentId = this.$route.params.contentId;
                const doc = await db.collection('topics').doc(topicId).get();
                if (!doc.exists) {
                    this.topicError = ERROR_MESSAGES.topicNotFound;
                    return;
                }
                const topicData = doc.data();
                const content = topicData.contents.find(content => content.id === contentId);
                if (!content) {
                    this.$router.push(`/topic/${topicId}`);
                    return;
                }
                this.contentDescription = content.description;
                this.contentLink = content.link;
                this.contentTitle = content.title;
            } catch (error) {
                this.topicError = error.message;
            }
        },
        async editContent() {
            try {
                if (!this.contentTitle) {
                    this.contentTitleError = ERROR_MESSAGES.requiredTitle;
                    return;
                }
                if (!this.contentLink) {
                    this.contentLinkError = ERROR_MESSAGES.requiredTitle;
                    return;
                }
                const urlRegex = /^(http|https):\/\//i;
                if (!urlRegex.test(this.contentLink)) {
                    this.contentLinkError = ERROR_MESSAGES.invalidLink;
                    return;
                }
                if (!this.contentDescription) {
                    this.contentDescriptionError = ERROR_MESSAGES.requiredDescription;
                    return;
                }
                const topicId = this.$route.params.id;
                const contentId = this.$route.params.contentId;
                const topicRef = db.collection('topics').doc(topicId);
                const doc = await topicRef.get();
                if (!doc.exists) {
                    this.topicError = ERROR_MESSAGES.topicNotFound;
                    return;
                }
                const topicData = doc.data();
                const newContents = topicData.contents.map(content => {
                    if (content.id === contentId) {
                        return {
                            id: contentId,
                            description: this.contentDescription,
                            link: this.contentLink,
                            title: this.contentTitle,
                        };
                    }
                    return content;
                });
                await topicRef.update({ contents: newContents });
                this.$router.push(`/topic/${topicId}`);
                this.clearFields();
            } catch (error) {
                this.topicError = error.message;
            }
        },
    },
    created() {
        if (!this.$root.user) {
            this.$router.push('/');
            return;
        }

        this.loadContent();
    },
};

// Vue component for user login
const Login = {
    template: '#s_login',
    data() {
        return {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            formMessage: null,
        };
    },
    methods: {
        async loginUser() {
            this.formMessage = null;
            this.emailError = '';
            this.passwordError = '';
            try {
                if (!this.email) {
                    this.emailError = ERROR_MESSAGES.requiredEmail;
                    return;
                }
                if (!this.password) {
                    this.passwordError = ERROR_MESSAGES.requiredPassword;
                    return;
                }

                await auth.signInWithEmailAndPassword(this.email, this.password);
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        this.$root.user = user;
                        this.$router.push('/');
                    }
                });
            } catch (error) {
                console.log(error)
                if (ERROR_MESSAGES[error.code]) {
                    this.formMessage = { type: 'error', text: ERROR_MESSAGES[error.code] };
                }
            }
        },
    },
};

// Vue component for the home page
const Home = {
    template: '#s_inicio',
};

// Vue component for displaying a topic
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
                }
            } catch (error) {
                this.$root.toast = { type: 'error', text: ERROR_MESSAGES.loadTopicError };
            }
        },
        async deleteTopic(id) {
            if (!confirm('Tem certeza que deseja deletar esse tópico? Todos os conteúdos serão perdidos.')) return;
            try {
                await db.collection('topics').doc(id).delete();
                this.$router.push('/');
            } catch (error) {
                this.$root.toast = { type: 'error', text: ERROR_MESSAGES.deleteTopicError };
            }
        },
        async deleteContent(id) {
            if (!confirm('Tem certeza que deseja deletar esse conteúdo?')) return;
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
                this.$root.toast = { type: 'error', text: ERROR_MESSAGES.deleteContentError };
            }
        },
        openEditTopic(id) {
            this.$router.push(`/topic/${id}/edit`);
        },
        openEditContent(id) {
            this.$router.push(`/topic/${this.$route.params.id}/content/${id}/edit`);
        }
    },
    created() {
        this.user = this.$root.user;

        const topicId = this.$route.params.id;
        this.loadTopic(topicId);

        db.collection('topics').doc(topicId).onSnapshot((doc) => {
            if (doc.exists) {
                const topicData = doc.data();
                this.title = topicData.title;
                this.contents = topicData.contents;
            }
        });
    },
    watch: {
        '$route.params.id': function (newId) {
            this.loadTopic(newId);
        }
    }
};

// Vue Router routes
const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
    { path: '/topic-form', component: FormTopic },
    { path: '/topic/:id', component: Topic },
    { path: '/topic/:id/content-form', component: FormContent },
    { path: '/topic/:id/edit', component: formEditTopic },
    { path: '/topic/:id/content/:contentId/edit', component: formEditContent },
];

// Vue Router instance
const router = new VueRouter({ routes });

// Vue app instance
const app = new Vue({
    router,
    data() {
        return {
            topics: [],
            user: null,
            loading: true,
            mobileMenuOpen: true,
            isMobile: window.innerWidth <= 768,
            toast: null,
        };
    },
    methods: {
        async logoutUser() {
            try {
                await auth.signOut();
                this.user = null;
                this.$router.push('/');
            } catch (error) {
                this.toast = { type: 'error', text: ERROR_MESSAGES.logoutError };
            }
        },
        async fetchTopicsMenu() {
            try {
                this.loading = true;
                db.collection('topics').orderBy('title').onSnapshot((querySnapshot) => {
                    this.topics = querySnapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }));
                });
                this.loading = false;
            } catch (error) {
                throw new Error(ERROR_MESSAGES.fetchTopicsError);
            }
        },
        toggleMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        closeToast() {
            this.toast = null;
        }
    },
    async created() {
        auth.onAuthStateChanged((user) => {
            this.user = user || null;
        });

        try {
            await this.fetchTopicsMenu();
        } catch (error) {
            this.toast = { type: 'error', text: ERROR_MESSAGES.fetchTopicsError };
        }

        addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
        });

        addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeToast();
            }
        });

        this.loading = false;
    }
}).$mount('#app');
