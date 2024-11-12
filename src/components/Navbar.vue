<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase';
import { QBtn, QTooltip } from 'quasar';

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
    <aside class="fixed-left bg-primary full-width q-pt-md">
        <div class="q-px-lg q-mb-lg">
            <QBtn unelevated color="secondary" @click="$emit('toggle')" icon="close" label="Fechar menu">
                <QTooltip>Fechar menu lateral</QTooltip>
            </QBtn>
        </div>

        <nav class="column g-gutter-md">
            <QBtn class="items-start" color="primary" padding="1rem 2rem" unelevated to="/" icon="home" label="Início"
                size="md" />

            <QBtn class="items-start" color="primary" padding="1rem 2rem" unelevated v-for="topic in topics"
                :key="topic.id" :to="'/topic/' + topic.route" :label="topic.title" icon="local_fire_department"
                size="md" />
        </nav>
    </aside>
</template>