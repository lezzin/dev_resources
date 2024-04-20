import {
    auth,
    db
} from "../firebase.js";
import routes from "./routes.js";

// Vue Router instance
const router = new VueRouter({
    routes
});

// Vue app instance
export const app = new Vue({
    router,
    data() {
        return {
            db: db,
            auth: auth,
            default_title: "Ferramentas para Devs",
            error_messages: {
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
                "generalError": "Erro desconhecido"
            },

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
                this.toast = {
                    type: 'error',
                    text: this.error_messages.logoutError
                };
            }
        },
        async fetchTopicsMenu() {
            try {
                this.loading = true;
                this.$root.db.collection('topics').orderBy('title').onSnapshot((querySnapshot) => {
                    this.topics = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        title: doc.data().title
                    }));
                    this.loading = false;
                });
            } catch (error) {
                throw new Error(this.error_messages.fetchTopicsError);
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
            this.toast = {
                type: 'error',
                text: this.error_messages.fetchTopicsError
            };
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
        toast: function(_) {
            if (this.toastTimer) {
                clearTimeout(this.toastTimer);
            }

            this.toastTimer = setTimeout(() => {
                this.toast = null;
            }, 5000);
        }
    }
});