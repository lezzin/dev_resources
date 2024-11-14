<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted, computed } from 'vue';
import { storeToRefs } from "pinia";
import { QPage } from "quasar";

import errorMessages from "../utils/errorMessages";
import { notifyUser } from "../utils/notification";
import { validateTitle } from "../utils/validations";
import { useTopic } from "../composables/useTopic";
import { useAuth } from '../stores/useAuth';
import { PAGE_TITLE, TITLE_MAX_LENGTH } from '../utils/variables';

import FormCard from "../components/FormCard.vue";
import MyInput from '../components/MyInput.vue';

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

        notifyUser('Tópico editado com sucesso', 'success');
        router.push(`/topic/${topicId}`);
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    notifyUser(errorMessages[error.code] || errorMessages.generalError(error), 'error');
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

const titleHint = computed(() => {
    return `Insira até ${TITLE_MAX_LENGTH} caracteres - (${title.value.length} de ${TITLE_MAX_LENGTH})`;
});

onMounted(() => {
    document.title = `${PAGE_TITLE} Editar Tópico`;
    loadTopic();
});

watch(user, (newUser) => {
    if (!newUser) router.push('/');
});
</script>

<template>
    <QPage>
        <FormCard title="Editar tópico" @send="editTopic" formId="edit-topic-form">
            <MyInput v-model="title" label="Título do tópico" :rules="[validateTitle]" :hint="titleHint" />
        </FormCard>
    </QPage>
</template>