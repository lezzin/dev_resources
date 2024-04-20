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
        async updatePassword() {
            this.formMessage = '';
            this.emailError = '';

            if (!this.email) {
                this.emailError = this.$root.error_messages.requiredEmail;
                return;
            }

            try {
                await this.$root.auth.sendPasswordResetEmail(this.email);
                this.formMessage = 'E-mail enviado com sucesso';
            } catch (error) {
                this.emailError = error.message;
            }
        },
    },
    created() {
        if (!this.$root.user) {
            this.$router.push("/");
            return;
        }

        this.email = this.$root.user.email;
        document.title = `${this.$root.default_title} | Perfil`;
    },
    watch: {
        "$root.user": function(user) {
            if (user) {
                this.email = user.email;
            } else {
                this.$router.push("/");
            }
        }
    }
};

export default Profile;
