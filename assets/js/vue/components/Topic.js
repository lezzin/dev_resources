const Topic = {
    template: "#s_topic",
    data() {
        return {
            id: '',
            title: '',
            created_at: '',
            contents: [],
            user: this.$root.user,
            userIsCreator: false,
            contentsEmpty: false,
        };
    },
    methods: {
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
                }
            } catch (error) {
                this.$root.toast = {
                    type: 'error',
                    text: this.this.$root.error_messages.loadTopicError
                };
            }
        },
        async deleteTopic(topicId) {
            if (!confirm('Tem certeza que deseja deletar esse tópico? Todo o conteúdo será perdido.')) return;

            try {
                const topicRef = this.$root.db.collection('topics').doc(topicId);
                const doc = await topicRef.get();
                if (!doc.exists) return false;
                await topicRef.delete();
                this.$root.toast = {
                    type: 'success',
                    text: "Tópico removido com sucesso"
                };
                this.$router.push('/');
            } catch (error) {
                this.$root.toast = {
                    type: 'error',
                    text: this.this.$root.error_messages.deleteTopicError
                };
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
                this.$root.toast = {
                    type: 'error',
                    text: this.this.$root.error_messages.deleteContentError
                };
            }
        },
        shouldDisplayMoveUpButton(index, createdBy) {
            return this.user && index > 0 && this.user.uid == createdBy;
        },
        shouldDisplayMoveDownButton(index, createdBy) {
            return this.user && index < this.contents.length - 1 && this.user.uid == createdBy;
        },
        async moveContentUp(index) {
            if (index > 0) {
                const temp = this.contents[index];
                this.$set(this.contents, index, this.contents[index - 1]);
                this.$set(this.contents, index - 1, temp);
                await this.updateContentOrder();
            }
        },
        async moveContentDown(index) {
            if (index < this.contents.length - 1) {
                const temp = this.contents[index];
                this.$set(this.contents, index, this.contents[index + 1]);
                this.$set(this.contents, index + 1, temp);
                await this.updateContentOrder();
            }
        },
        async updateContentOrder() {
            try {
                const topicId = this.id;
                await this.$root.db.collection('topics').doc(topicId).update({
                    contents: this.contents
                });
                this.$root.toast = {
                    type: 'success',
                    text: 'Ordem dos conteúdos atualizada com sucesso'
                };
            } catch (error) {
                this.$root.toast = {
                    type: 'error',
                    text: 'Erro ao atualizar a ordem dos conteúdos'
                };
            }
        },
        openEditTopic(id) {
            this.$router.push(`/topic/${id}/edit`);
        },
        openEditContent(id) {
            this.$router.push(`/topic/${this.$route.params.id}/content/${id}/edit`);
        }
    },
    created() {
        const topicId = this.$route.params.id;
        this.loadTopic(topicId);

        this.$root.db.collection('topics').doc(topicId).onSnapshot((doc) => {
            if (doc.exists) {
                const topicData = doc.data();
                this.title = topicData.title;
                this.contents = topicData.contents;
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