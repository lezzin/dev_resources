<script setup>
import errorMessages from '../utils/errorMessages';
import { db } from '../firebase';

import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useToast } from '../composables/useToast';
import { useAuth } from '../stores/useAuth';

import InputField from '../components/InputField.vue';

const router = useRouter();

const { showToast } = useToast();
const authUser = useAuth();
const { user } = storeToRefs(authUser);

const title = ref('');
const titleError = ref('');

const addTopic = async () => {
    titleError.value = '';

    if (!title.value) {
        titleError.value = errorMessages.requiredTitle;
        return;
    }

    try {
        const topicsRef = collection(db, 'topics');
        const q = query(topicsRef, where('title', '==', title.value));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            titleError.value = errorMessages.topicExists;
            return;
        }

        const docRef = await addDoc(topicsRef, {
            title: title.value,
            contents: [],
            created_at: new Date(),
            created_by: user.value.uid,
        });

        const createdTopicId = docRef.id;
        title.value = '';
        titleError.value = '';
        showToast('success', 'Tópico adicionado com sucesso');
        router.push(`/topic/${createdTopicId}`);
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    titleError.value = error.message || errorMessages.generalError;
}

onMounted(() => {
    document.title = `Ferramentas para Devs | Adicionar tópico`;

    if (!user?.value?.uid) {
        router.push("/");
    }
})

watch(user, (newUser) => {
    if (!newUser) {
        router.push("/");
    }
});

watch(title, () => {
    titleError.value = "";
});
</script>

<template>
    <form @submit.prevent="addTopic" class="form">
        <div class="header-top form_header">
            <h2 class="title">Adicionar Tópico</h2>
            <a class="btn-outline-primary" href="javascript:history.back()" title="Voltar para a página anterior">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
        </div>

        <div class="form_body">
            <InputField label="Título" id="topic-title" v-model="title" :error="titleError"
                placeholder="Estudos, materiais..." />

            <button class="btn-primary" title="Adicionar tópico">Adicionar</button>
        </div>
    </form>
</template>