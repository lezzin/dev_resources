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
                this.contentTitleError = this.$root.error_messages.requiredTitle;
            }

            if (!this.contentLink) {
                this.contentLinkError = this.$root.error_messages.requiredLink;
            }

            if (!this.contentDescription) {
                this.contentDescriptionError = this.$root.error_messages.requiredDescription;
            }

            if (!this.contentTitle || !this.contentLink || !this.contentDescription) return;

            const urlRegex = /^(http|https):\/\//i;
            if (!urlRegex.test(this.contentLink)) {
                this.contentLinkError = this.$root.error_messages.invalidLink;
                return;
            }

            try {
                const topicId = this.$route.params.id;
                const topicRef = this.$root.db.collection('topics').doc(topicId);
                const doc = await topicRef.get();
                if (!doc.exists) {
                    this.topicError = this.$root.error_messages.topicNotFound;
                    return;
                }
                const topicData = doc.data();
                topicData.contents.push({
                    id: Date.now().toString(36),
                    description: this.contentDescription,
                    link: this.contentLink,
                    title: this.contentTitle,
                    created_by: this.$root.user.uid,
                });
                await topicRef.update({
                    contents: topicData.contents
                });
                this.$router.push(`/topic/${topicId}`);
                this.clearFields();
                this.$root.toast = {
                    type: 'success',
                    text: "Conteúdo adicionado com sucesso"
                };
            } catch (error) {
                this.handleError(error);
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
        handleError(error) {
            this.topicError = error.message || this.$root.error_messages.generalError;
        }
    },
    created() {
        document.title = `${this.$root.default_title} | Adicionar conteúdo`;
        if (!this.$root.user) this.$router.push("/");
    },
};

export default FormContent;
