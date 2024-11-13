<script setup>
import errorMessages from "../utils/errorMessages";
import { db } from "../firebase";

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from "pinia";

import { useAuth } from '../stores/useAuth';

import FormCard from "../components/layout/FormCard.vue";
import { QBtn, QBtnGroup, QInput, QPage, useQuasar } from "quasar";
import { validateTitle } from "../utils/validations";
import { useTopic } from "../composables/useTopic";

const $q = useQuasar();

const router = useRouter();
const route = useRoute();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const topicComposable = useTopic();

const title = ref('');

const editTopic = async () => {
    try {
        const topicId = route.params.id;
        await topicComposable.editTopic(title.value, topicId);

        $q.notify({
            message: 'Tópico editado com sucesso',
            color: 'green'
        });

        router.push(`/topic/${topicId}`);
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    $q.notify({
        message: errorMessages[error.code] || errorMessages.generalError,
        color: 'error'
    });
};

const loadTopic = async () => {
    const topicId = route.params.id;

    try {
        const topicData = await topicComposable.loadTopic(topicId);
        title.value = topicData.title;
    } catch (error) {
        handleError(error);
    }
};

onMounted(() => {
    document.title = `Ferramentas para Devs | Editar Tópico`;
    loadTopic();
});

watch(user, (newUser) => {
    if (!newUser) router.push('/');
});
</script>

<template>
    <QPage padding>
        <FormCard title="Editar tópico" @send="editTopic" :message="message">
            <template #form>
                <QInput outlined dense hide-bottom-space v-model="title" label="Título do tópico"
                    :rules="[validateTitle]" />

                <QBtnGroup>
                    <QBtn type="submit" color="primary" icon="edit" label="Editar" :disabled="!title" />
                    <QBtn flat color="red" @click="() => $router.back()" icon="arrow_back" label="Voltar" />
                </QBtnGroup>
            </template>
        </FormCard>
    </QPage>
</template>