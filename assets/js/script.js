import { auth, db } from "./firebase.js";

const DEFAULT_TITLE = "Ferramentas para Devs";

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
            email: '',
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
            return;
        }

        this.email = this.$root.user.email;
        document.title = `${DEFAULT_TITLE} | Perfil`;
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
            if (!this.topicTitle) {
                this.titleError = ERROR_MESSAGES.requiredTitle;
                return;
            }

            try {
                const querySnapshot = await db.collection('topics').where('title', '==', this.topicTitle).get();
                let createdTopicId = null;

                if (querySnapshot.size > 0) {
                    this.titleError = ERROR_MESSAGES.topicExists;
                    return;
                }

                await db.collection('topics').add({
                    id: this.topicTitle.toLowerCase().replace(/ /g, '-'),
                    title: this.topicTitle,
                    contents: [],
                    created_at: new Date(),
                }).then(function (docRef) {
                    createdTopicId = docRef.id;
                })
                this.topicTitle = '';
                this.titleError = '';
                this.$root.toast = { type: 'success', text: 'Tópico adicionado com sucesso' };
                if (createdTopicId) {
                    this.$router.push(`/topic/${createdTopicId}`);
                }
            } catch (error) {
                this.titleError = error.message;
            }
        },
    },
    created() {
        if (!this.$root.user) {
            this.$router.push('/');
        }

        document.title = `${DEFAULT_TITLE} | Adicionar tópico`;
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
                this.$root.toast = { type: 'success', text: 'Tópico editado com sucesso' };
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
        document.title = `${DEFAULT_TITLE} | Editar tópico`;
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
            this.contentDescriptionError = this.contentLinkError = this.contentTitleError = "";

            if (!this.contentTitle) {
                this.contentTitleError = ERROR_MESSAGES.requiredTitle;
            }

            if (!this.contentLink) {
                this.contentLinkError = ERROR_MESSAGES.requiredLink;
            }

            if (!this.contentDescription) {
                this.contentDescriptionError = ERROR_MESSAGES.requiredDescription;
            }

            if (!this.contentTitle | !this.contentLink | !this.contentDescription) return;

            const urlRegex = /^(http|https):\/\//i;
            if (!urlRegex.test(this.contentLink)) {
                this.contentLinkError = ERROR_MESSAGES.invalidLink;
                return;
            }

            try {
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
                this.$root.toast = { type: 'success', text: "Conteúdo adicionado com sucesso" };
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

        document.title = `${DEFAULT_TITLE} | Adicionar conteúdo`;
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
                this.$root.toast = { type: 'success', text: 'Conteúdo editado com sucesso' };
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
        document.title = `${DEFAULT_TITLE} | Editar conteúdo`;
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
            this.emailError = this.passwordError = '';

            if (!this.email) {
                this.emailError = ERROR_MESSAGES.requiredEmail;
            }

            if (!this.password) {
                this.passwordError = ERROR_MESSAGES.requiredPassword;
            }

            if (!this.email | !this.password) {
                return;
            }

            try {
                const userCredential = await auth.signInWithEmailAndPassword(this.email, this.password);
                const user = userCredential.user;
                this.$root.user = user;
                this.$router.push('/');
            } catch (error) {
                if (ERROR_MESSAGES[error.code]) {
                    this.formMessage = { type: 'error', text: ERROR_MESSAGES[error.code] ?? "Erro desconhecido. Tente novamente mais tarde." };
                }
            }
        },
    },
    created() {
        document.title = `${DEFAULT_TITLE} | Login`;
    }
};

// Vue component for the home page
const Home = {
    template: '#s_inicio',
    data() {
        return {
            article_tips: [],
            article_tutorials: []
        };
    },
    methods: {
        async fetchArticles(type) {
            try {
                const response = await fetch(`https://dev.to/api/articles?tag=${type}&language=pt&per_page=10`);
                const data = await response.json();
                return data;
            } catch (error) {
                this.$root.toast = {
                    type: "error",
                    text: "Erro na solicitação de artigos: " + error
                };
                return null;
            }
        },
        async loadArticles() {
            this.article_tips = await this.fetchArticles("tip");
            this.article_tutorials = await this.fetchArticles("tutorial");
        }
    },
    created() {
        this.loadArticles();
        document.title = DEFAULT_TITLE;
    }
};

// Vue component for displaying a topic
const Topic = {
    template: "#s_topic",
    data() {
        return {
            id: '',
            title: '',
            contents: [],
            user: this.$root.user,
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
                    document.title = `${DEFAULT_TITLE} | ${this.title}`;
                }
            } catch (error) {
                this.$root.toast = { type: 'error', text: ERROR_MESSAGES.loadTopicError };
            }
        },
        async deleteTopic(topicId) {
            if (!confirm('Tem certeza que deseja deletar esse tópico? Todo o conteúdo será perdido.')) return;

            try {
                const topicRef = db.collection('topics').doc(topicId);
                const doc = await topicRef.get();
                if (!doc.exists) return false;
                await topicRef.delete();
                this.$root.toast = { type: 'success', text: "Tópico removido com sucesso" };
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
                this.$root.toast = { type: 'success', text: "Conteúdo removido com sucesso" };
            } catch (error) {
                this.$root.toast = { type: 'error', text: ERROR_MESSAGES.deleteContentError };
            }
        },
        shouldDisplayMoveUpButton(index) {
            return this.user && index > 0;
        },
        shouldDisplayMoveDownButton(index) {
            return this.user && index < this.contents.length - 1;
        },
        async moveContentUp(index) {
            if (index > 0) {
                const temp = this.contents[index];
                this.$set(this.contents, index, this.contents[index - 1]);
                this.$set(this.contents, index - 1, temp);
                await this.updateContentOrder();
            }
        },
        async moveContentDown(index) {
            if (index < this.contents.length - 1) {
                const temp = this.contents[index];
                this.$set(this.contents, index, this.contents[index + 1]);
                this.$set(this.contents, index + 1, temp);
                await this.updateContentOrder();
            }
        },
        async updateContentOrder() {
            try {
                const topicId = this.id;
                await db.collection('topics').doc(topicId).update({ contents: this.contents });
                this.$root.toast = { type: 'success', text: 'Ordem dos conteúdos atualizada com sucesso' };
            } catch (error) {
                this.$root.toast = { type: 'error', text: 'Erro ao atualizar a ordem dos conteúdos' };
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
        },

        '$root.user': function (user) {
            this.user = user;
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
            mobileMenuOpen: false,
            isMobile: window.innerWidth <= 768,
            toast: null,

            toastTimer: null,
        };
    },
    methods: {
        async logoutUser() {
            try {
                await auth.signOut();
                this.user = null;
            } catch (error) {
                this.toast = { type: 'error', text: ERROR_MESSAGES.logoutError };
            }
        },
        async fetchTopicsMenu() {
            try {
                this.loading = true;
                db.collection('topics').orderBy('title').onSnapshot((querySnapshot) => {
                    this.topics = querySnapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }));
                    this.loading = false;
                });
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
            if (user) {
                this.user = user;
            }
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
    },
    watch: {
        toast: function (_) {
            if (this.toastTimer) {
                clearTimeout(this.toastTimer);
            }

            this.toastTimer = setTimeout(() => {
                this.toast = null;
            }, 5000);
        }
    }
}).$mount('#app');
