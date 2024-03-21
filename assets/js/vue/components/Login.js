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

            if (!this.email | !this.password) {
                return;
            }

            try {
                const userCredential = await this.$root.auth.signInWithEmailAndPassword(this.email, this.password);
                const user = userCredential.user;
                this.$root.user = user;
                this.$router.push('/');
            } catch (error) {
                if (ERROR_MESSAGES[error.code]) {
                    this.formMessage = {
                        type: 'error',
                        text: ERROR_MESSAGES[error.code] ?? "Erro desconhecido. Tente novamente mais tarde."
                    };
                }
            }
        },
    },
    created() {
        document.title = `${this.$root.default_title} | Login`;

        if (this.$root.user) {
            this.$router.push("/");
            return;
        }
    },
};

export default Login;