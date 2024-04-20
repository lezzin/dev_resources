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
                const doc = await this.$root.db.collection('topics').doc(topicId).get();
                if (!doc.exists) {
                    this.topicError = this.$root.error_messages.topicNotFound;
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
                this.handleError(error);
            }
        },
        async editContent() {
            try {
                this.contentTitleError = this.contentLinkError = this.contentDescriptionError = '';

                if (!this.contentTitle) {
                    this.contentTitleError = this.$root.error_messages.requiredTitle;
                    return;
                }

                if (!this.contentLink) {
                    this.contentLinkError = this.$root.error_messages.requiredLink;
                    return;
                }

                const urlRegex = /^(http|https):\/\//i;
                if (!urlRegex.test(this.contentLink)) {
                    this.contentLinkError = this.$root.error_messages.invalidLink;
                    return;
                }

                if (!this.contentDescription) {
                    this.contentDescriptionError = this.$root.error_messages.requiredDescription;
                    return;
                }

                const topicId = this.$route.params.id;
                const contentId = this.$route.params.contentId;
                const topicRef = this.$root.db.collection('topics').doc(topicId);
                const doc = await topicRef.get();
                if (!doc.exists) {
                    this.topicError = this.$root.error_messages.topicNotFound;
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
                            created_by: this.$root.user.uid,
                        };
                    }
                    return content;
                });
                await topicRef.update({
                    contents: newContents
                });
                this.$root.toast = {
                    type: 'success',
                    text: 'Conteúdo editado com sucesso'
                };
                this.$router.push(`/topic/${topicId}`);
                this.clearFields();
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
        },
    },
    created() {
        document.title = `${this.$root.default_title} | Editar conteúdo`;

        if (!this.$root.user) {
            this.$router.push('/');
            return;
        }

        this.loadContent();
    },
    watch: {
        "$root.user": function(user) {
            if (!user) this.$router.push("/");
        }
    }
};

export default formEditContent;
