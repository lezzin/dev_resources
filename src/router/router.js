import { createRouter, createWebHashHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../utils/firebase";

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
            component: () => import('../views/Home.vue'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/login',
            component: () => import('../views/Login.vue'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/profile',
            component: () => import('../views/Profile.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/topic-form',
            component: () => import('../views/FormTopic.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/topic/:id',
            component: () => import('../views/Topic.vue'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/topic/:id/content-form',
            component: () => import('../views/FormContent.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/topic/:id/edit',
            component: () => import('../views/FormEditTopic.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/topic/:id/content/:contentId/edit',
            component: () => import('../views/FormEditContent.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/:catchAll(.*)',
            component: () => import('../views/NotFound.vue'),
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