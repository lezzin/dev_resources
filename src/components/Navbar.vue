<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import { db } from '../utils/firebase';
import { QBtn, QImg, QTooltip, useQuasar } from 'quasar';

const $q = useQuasar();
const topics = ref([]);

onMounted(() => {
    const topicsRef = collection(db, 'topics');
    const topicsQuery = query(topicsRef, orderBy('title'));

    onSnapshot(topicsQuery, (snapshot) => {
        topics.value = snapshot.docs.map(doc => {
            return {
                route: doc.id, ...doc.data()
            }
        })
    });
});
</script>

<template>
    <nav class="q-pt-sm column g-gutter-md">
        <div class="row items-center q-py-sm q-px-lg" v-if="$q.screen.lt.md">
            <QBtn :color="`${$q.dark.isActive ? 'white' : 'dark'}`" @click="$emit('toggle')" flat round icon="menu"
                class="q-mr-sm">
                <QTooltip>Fechar menu lateral</QTooltip>
            </QBtn>

            <RouterLink to="/">
                <QImg src="../assets/logo.svg" width="32px" height="32px" />
            </RouterLink>
        </div>

        <QBtn class="google-copy ellipsis items-start" padding="1rem 2rem" unelevated to="/" icon="home" label="Início"
            size="md" />

        <QBtn class="google-copy ellipsis items-start" padding="1rem 2rem" unelevated v-for="topic in topics"
            :key="topic.id" :to="'/topic/' + topic.route" :label="topic.title" icon="local_fire_department" size="md" />
    </nav>
</template>

<style>
.google-copy {
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
}
</style>