const Home = {
    template: '#s_inicio',
    data() {
        return {
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
                this.handleError(error);
                return null;
            }
        },
        async loadArticles() {
            this.article_tutorials = await this.fetchArticles("tutorial");
            if (this.article_tutorials) {
                this.initializeSwiper('.swiper-slide-tutorials');
            }
        },
        initializeSwiper(selector) {
            const SWIPER_OPTIONS = {
                slidesPerView: 3,
                spaceBetween: 10,
                breakpoints: {
                    320: { slidesPerView: 1, },  // small devices
                    768: { slidesPerView: 2, },  // medium-sized devices
                    1024: { slidesPerView: 3, }, // larger devices
                    1440: { slidesPerView: 4, }  // extra-large devices
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                }
            };
            new Swiper(selector, SWIPER_OPTIONS);
        },
        handleError(error) {
            this.$root.toast = {
                type: "error",
                text: "Erro na solicitação de artigos: " + error
            };
        }
    },
    created() {
        document.title = this.$root.default_title;
        this.loadArticles();
    },
};

export default Home;
