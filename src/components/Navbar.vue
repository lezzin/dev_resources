<script setup>
import { ref, onMounted, inject } from 'vue';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { RouterLink } from 'vue-router';

import { db } from '../firebase';

const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const topics = ref([]);
const isMobile = inject("isMobile");

onMounted(() => {
    const topicsRef = collection(db, 'topics');
    const topicsQuery = query(topicsRef, orderBy('title'));

    const unsubscribe = onSnapshot(topicsQuery, (snapshot) => {
        topics.value = snapshot.docs.map(doc => {
            return {
                route: doc.id, ...doc.data()
            }
        })
    });

    return () => unsubscribe();
});
</script>

<template>
    <nav id="navigation" v-if="!isMobile | props.isActive">
        <RouterLink class="link" to="/" title="Ir para a página inicial">
            <i class="fa-solid fa-house"></i>
            Início
        </RouterLink>

        <RouterLink class="link" v-for="topic in topics" :key="topic.id" :to="'/topic/' + topic.route"
            title="Ir para o tópico">
            <i class="fa-solid fa-fire"></i>
            {{ topic.title }}
        </RouterLink>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    flex-direction: column;
}

.link,
.router-link-active {
    text-decoration: none;
    padding: 1rem 1rem 1rem 3rem;
    overflow: hidden;
    position: relative;
    font-weight: 400;
}

.link:hover:not(.router-link-exact-active),
.router-link-active:hover:not(.router-link-exact-active) {
    text-decoration: none;
}

.link:hover:not(.router-link-exact-active)::before,
.router-link-active:hover:not(.router-link-exact-active)::before {
    opacity: 0.3;
}

.link::before,
.router-link-active::before {
    z-index: -1;
    content: "";
    position: absolute;
    inset: 0;
    display: block;
    background-color: #646bd4;
    border-top-right-radius: 10rem;
    border-bottom-right-radius: 10rem;
    opacity: 0;
    transform: translateX(-3rem);
    transition: all 0.3s ease;
}

.link.router-link-exact-active,
.router-link-active.router-link-exact-active {
    color: #fff;
    pointer-events: none;
}

.link.router-link-exact-active::before,
.router-link-active.router-link-exact-active::before {
    transform: translateX(0);
    opacity: 1;
}

@media (max-width: 768px) {
    nav {
        padding: 1.5rem 0;
    }

    .link,
    .router-link-active {
        padding-left: 1.5rem;
    }
}
</style>