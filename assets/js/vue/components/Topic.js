const Topic = {
    template: "#s_topic",
    data() {
        return {
            id: '',
            title: '',
            created_at: '',
            contents: [],
            user: null,
            userIsCreator: false,
            contentsEmpty: false,
        };
    },
    methods: {
        sortContents() {
            this.contents.sort((a, b) => {
                const descriptionA = a.description.toLowerCase();
                const descriptionB = b.description.toLowerCase();
                return descriptionA.localeCompare(descriptionB);
            });
        },
        async loadTopic(topicId) {
            try {
                const doc = await this.$root.db.collection('topics').doc(topicId).get();
                if (doc.exists) {
                    const topicData = doc.data();
                    this.id = topicId;
                    this.title = topicData.title;
                    this.contents = topicData.contents;
                    this.created_at = topicData.created_at;
                    this.userIsCreator = this.user && this.user.uid == topicData.created_by;
                    this.contentsEmpty = this.contents.length === 0;
                    document.title = `${this.$root.default_title} | ${this.title}`;

                    this.sortContents();
                }
            } catch (error) {
                this.handleError('loadTopicError');
            }
        },
        async deleteTopic(topicId) {
            if (!confirm('Tem certeza que deseja deletar esse tópico? Todo o conteúdo será perdido.')) return;

            try {
                await this.$root.db.collection('topics').doc(topicId).delete();
                this.$root.toast = {
                    type: 'success',
                    text: "Tópico removido com sucesso"
                };
                this.$router.push('/');
            } catch (error) {
                this.handleError('deleteTopicError');
            }
        },
        async deleteContent(id) {
            if (!confirm('Tem certeza que deseja deletar esse conteúdo?')) return;

            try {
                const topicId = this.$route.params.id;
                const topicRef = this.$root.db.collection('topics').doc(topicId);
                const doc = await topicRef.get();
                if (!doc.exists) {
                    this.$router.push('/');
                    return;
                }
                const topicData = doc.data();
                const newContents = topicData.contents.filter(content => content.id !== id);
                await topicRef.update({
                    contents: newContents
                });
                this.$root.toast = {
                    type: 'success',
                    text: "Conteúdo removido com sucesso"
                };
            } catch (error) {
                this.handleError('deleteContentError');
            }
        },
        openEditTopic(id) {
            this.$router.push(`/topic/${id}/edit`);
        },
        openEditContent(id) {
            this.$router.push(`/topic/${this.$route.params.id}/content/${id}/edit`);
        },
        handleError(errorMessage) {
            this.$root.toast = {
                type: 'error',
                text: this.$root.error_messages[errorMessage]
            };
        }
    },
    created() {
        this.user = this.$root.user;
        const topicId = this.$route.params.id;
        this.loadTopic(topicId);

        this.$root.db.collection('topics').doc(topicId).onSnapshot((doc) => {
            if (doc.exists) {
                const topicData = doc.data();
                this.title = topicData.title;
                this.contents = topicData.contents;

                this.sortContents();
            }
        });
    },
    watch: {
        '$route.params.id': function (newId) {
            this.loadTopic(newId);
        },

        '$root.user': function (user) {
            this.userIsCreator = false;
            this.user = user;
        }
    }
};

export default Topic;
