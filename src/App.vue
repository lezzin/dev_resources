<script setup>
import { auth } from './firebase';

import { RouterView } from 'vue-router';
import { onMounted, onBeforeUnmount, ref, provide } from 'vue';

import { useToast } from './composables/useToast';

import Toast from './components/Toast.vue';
import TopicMenu from './components/TopicMenu.vue';

const { closeToast, toast } = useToast();

const isMobile = ref(window.innerWidth <= 768);

const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

provide('isMobile', isMobile);
</script>

<template>
    <div class="container">

        <TopicMenu />

        <main>
            <RouterView></RouterView>
        </main>
    </div>

    <Teleport to="#toast">
        <Toast :toast="toast" @close="closeToast" />
    </Teleport>
</template>