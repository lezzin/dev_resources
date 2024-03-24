const Home = {
    template: '#s_inicio',
    data() {
        return {
            article_tips: [],
            article_tutorials: []
        };
    },
    methods: {
        async fetchArticles(type) {
            try {
                const response = await fetch(`https://dev.to/api/articles?tag=${type}&language=pt&per_page=10`);
                const data = await response.json();
                return data;
            } catch (error) {
                this.$root.toast = {
                    type: "error",
                    text: "Erro na solicitação de artigos: " + error
                };
                return null;
            }
        },
        async loadArticles() {
            this.article_tips = await this.fetchArticles("tip");
            this.article_tutorials = await this.fetchArticles("tutorial");
        }
    },
    created() {
        document.title = this.$root.default_title;
        this.loadArticles();
    }
};

export default Home;