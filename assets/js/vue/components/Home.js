const Home = {
    template: '#s_inicio',
    created() {
        document.title = this.$root.default_title;
    }
};

export default Home;
