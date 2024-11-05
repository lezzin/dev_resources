<script setup>
import errorMessages from "../utils/errorMessages";
import { db } from "../firebase";

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from "pinia";

import { useToast } from '../composables/useToast';
import { useAuth } from '../stores/useAuth';

import InputField from '../components/InputField.vue';

const router = useRouter();
const route = useRoute();

const { showToast } = useToast();
const authUser = useAuth();
const { user } = storeToRefs(authUser);

const topicTitle = ref('');
const titleError = ref('');
const topicError = ref('');

const editTopic = async () => {
    titleError.value = '';
    topicError.value = '';

    if (!topicTitle.value) {
        titleError.value = errorMessages.requiredTitle;
        return;
    }

    try {
        const topicId = route.params.id;
        const topicRef = doc(db, 'topics', topicId);

        await updateDoc(topicRef, {
            title: topicTitle.value
        });

        showToast('success', 'Tópico editado com sucesso');
        router.push(`/topic/${topicId}`);
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    titleError.value = error.message || errorMessages.generalError;
};

const loadTopic = async () => {
    try {
        const topicId = route.params.id;
        const topicRef = doc(db, 'topics', topicId);
        const docSnap = await getDoc(topicRef);

        if (!docSnap.exists()) {
            topicError.value = errorMessages.topicNotFound;
            return;
        }

        const topicData = docSnap.data();
        topicTitle.value = topicData.title;
    } catch (error) {
        handleError(error);
    }
};

onMounted(() => {
    document.title = `Ferramentas para Devs | Editar Tópico`;

    if (!user?.value?.uid) {
        router.push('/');
        return;
    };

    loadTopic();
});

watch(user, (newUser) => {
    if (!newUser) router.push('/');
});
</script>

<template>
    <form @submit.prevent="editTopic" class="form">
        <p class="error-text" v-if="topicError">{{ topicError }}</p>

        <div class="header-top form_header">
            <h2 class="title">Editar Tópico</h2>
            <a class="btn-outline-primary" href="javascript:history.back()" title="Voltar para a página anterior">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
        </div>

        <div class="form_body">
            <InputField label="Título" id="topic-title" v-model="topicTitle" :error="titleError"
                placeholder="Estudos, materiais..." />

            <button class="btn-primary" title="Editar tópico">Editar</button>
        </div>
    </form>
</template>