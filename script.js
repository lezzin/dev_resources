const routes = [
    {
        path: '/',
        component: {
            template: '#s_inicio'
        }
    },
    {
        path: '/materiais',
        component: {
            template: '#s_materiais'
        }
    },
    {
        path: '/aprender',
        component: {
            template: '#s_aprender'
        }
    },
    {
        path: '/ferramentas',
        component: {
            template: '#s_ferramentas'
        }
    },
    {
        path: '/plataformas',
        component: {
            template: '#s_plataformas'
        }
    }
];

const router = new VueRouter({ routes });
const app = new Vue({ router, }).$mount('#app');