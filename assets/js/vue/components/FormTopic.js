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
                this.titleError = this.$root.error_messages.requiredTitle;
                return;
            }

            try {
                const querySnapshot = await this.$root.db.collection('topics').where('title', '==', this.topicTitle).get();
                let createdTopicId = null;

                if (querySnapshot.size > 0) {
                    this.titleError = this.$root.error_messages.topicExists;
                    return;
                }

                await this.$root.db.collection('topics').add({
                    id: this.topicTitle.toLowerCase().replace(/ /g, '-'),
                    title: this.topicTitle,
                    contents: [],
                    created_at: new Date(),
                    created_by: this.$root.user.uid,
                }).then(function (docRef) {
                    createdTopicId = docRef.id;
                })
                this.topicTitle = '';
                this.titleError = '';
                this.$root.toast = {
                    type: 'success',
                    text: 'Tópico adicionado com sucesso'
                };
                if (createdTopicId) {
                    this.$router.push(`/topic/${createdTopicId}`);
                }
            } catch (error) {
                this.titleError = error.message;
            }
        },
    },
    created() {
        document.title = `${this.$root.default_title} | Adicionar tópico`;
        if (!this.$root.user) this.$router.push("/");
    },
    watch: {
        "$root.user": function (user) {
            if (!user) this.$router.push("/");
        }
    }
};

export default FormTopic;