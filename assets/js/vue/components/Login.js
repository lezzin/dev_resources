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
                this.emailError = this.$root.error_messages.requiredEmail;
            }

            if (!this.password) {
                this.passwordError = this.$root.error_messages.requiredPassword;
            }

            if (!this.email || !this.password) {
                return;
            }

            try {
                const userCredential = await this.$root.auth.signInWithEmailAndPassword(this.email, this.password);
                const user = userCredential.user;
                this.$root.user = user;
                this.$router.push('/');
            } catch (error) {
                this.handleError(error);
            }
        },
        handleError(error) {
            const errorMessage = this.$root.error_messages[error.code] || "Erro desconhecido. Tente novamente mais tarde.";
            this.formMessage = {
                type: 'error',
                text: errorMessage
            };
        },
    },
    created() {
        document.title = `${this.$root.default_title} | Login`;

        if (this.$root.user) {
            this.$router.push("/");
        }
    },
};

export default Login;
