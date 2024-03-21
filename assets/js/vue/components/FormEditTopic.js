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
                const doc = await this.$root.db.collection('topics').doc(this.$route.params.id).get();
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
                    this.titleError = this.$root.error_messages.requiredTitle;
                    return;
                }
                const querySnapshot = await this.$root.db.collection('topics').where('title', '==', this.topicTitle).get();
                if (querySnapshot.size > 0) {
                    this.titleError = this.$root.error_messages.topicExists;
                    return;
                }
                await this.$root.db.collection('topics').doc(this.$route.params.id).update({
                    title: this.topicTitle
                });
                this.topicTitle = '';
                this.titleError = '';
                this.$router.push(`/topic/${this.$route.params.id}`);
                this.$root.toast = {
                    type: 'success',
                    text: 'Tópico editado com sucesso'
                };
            } catch (error) {
                this.titleError = error.message;
            }
        },
    },
    created() {
        document.title = `${this.$root.default_title} | Editar tópico`;
        this.loadTopic();
        if (!this.$root.user) this.$router.push("/");
    },
    watch: {
        "$root.user": function (user) {
            if (!user) this.$router.push("/");
        }
    }
};

export default formEditTopic; 