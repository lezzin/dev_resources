import { createRouter, createWebHashHistory } from "vue-router";

import Login from '../views/Login.vue';
import Topic from '../views/Topic.vue';
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue';
import Profile from '../views/Profile.vue';
import FormEditTopic from '../views/FormEditTopic.vue';
import FormEditContent from '../views/FormEditContent.vue';
import FormTopic from "../views/FormTopic.vue";
import FormContent from "../views/FormContent.vue";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            auth,
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/topic-form',
            component: FormTopic,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/topic/:id',
            component: Topic,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/topic/:id/content-form',
            component: FormContent,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/topic/:id/edit',
            component: FormEditTopic,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/topic/:id/content/:contentId/edit',
            component: FormEditContent,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/:catchAll(.*)',
            component: NotFound,
            meta: {
                requiresAuth: false
            }
        }
    ],
});


router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            next("/login");
        }
    } else {
        next();
    }
});

export default router;