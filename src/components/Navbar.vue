<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase';
import { QBtn, QImg, QTooltip } from 'quasar';

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