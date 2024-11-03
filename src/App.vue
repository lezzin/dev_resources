<script setup>
import { RouterView } from 'vue-router';
import { onMounted, onBeforeUnmount, ref, provide } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Toast from './components/Toast.vue';
import { watch } from 'vue';
import TopicMenu from './components/TopicMenu.vue';

const user = ref(null);
const isMobile = ref(window.innerWidth <= 768);
const toast = ref({ type: '', text: '' });
let toastTimeout;

const closeToast = () => {
    toast.value = { type: '', text: '' };
};

watch(toast, () => {
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
        closeToast();
    }, 5000);
})

const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);

    onAuthStateChanged(auth, (newUser) => {
        if (newUser) {
            user.value = newUser;
        } else {
            user.value = null;
        }
    });
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

provide('user', user);
provide('isMobile', isMobile);
provide('toast', toast);
</script>

<template>
    <div class="container">
        <Toast :toast="toast" @close="closeToast" />

        <TopicMenu />

        <main>
            <RouterView></RouterView>
        </main>
    </div>
</template>