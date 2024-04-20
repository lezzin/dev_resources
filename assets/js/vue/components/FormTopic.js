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
            this.titleError = '';

            if (!this.topicTitle) {
                this.titleError = this.$root.error_messages.requiredTitle;
                return;
            }

            try {
                const querySnapshot = await this.$root.db.collection('topics').where('title', '==', this.topicTitle).get();

                if (querySnapshot.size > 0) {
                    this.titleError = this.$root.error_messages.topicExists;
                    return;
                }

                const docRef = await this.$root.db.collection('topics').add({
                    title: this.topicTitle,
                    contents: [],
                    created_at: new Date(),
                    created_by: this.$root.user.uid,
                });

                const createdTopicId = docRef.id;
                this.topicTitle = '';
                this.titleError = '';
                this.$root.toast = {
                    type: 'success',
                    text: 'Tópico adicionado com sucesso'
                };
                this.$router.push(`/topic/${createdTopicId}`);
            } catch (error) {
                this.handleError(error);
            }
        },
        handleError(error) {
            this.titleError = error.message || this.$root.error_messages.generalError;
        }
    },
    created() {
        document.title = `${this.$root.default_title} | Adicionar tópico`;
        if (!this.$root.user) this.$router.push("/");
    },
    watch: {
        "$root.user": function(user) {
            if (!user) this.$router.push("/");
        }
    }
};

export default FormTopic;
