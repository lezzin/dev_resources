<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

import errorMessages from "../../utils/errorMessages";
import { notifyUser } from "../../utils/notification";
import { validateTitle } from "../../utils/validations";
import { useTopic } from "../../composables/useTopic";
import { TITLE_MAX_LENGTH } from '../../utils/variables';

import CardForm from "../form/CardForm.vue";
import FormInput from '../form/FormInput.vue';

const emit = defineEmits(["close"]);

const topicComposable = useTopic();
const route = useRoute();

const title = ref('');

const editTopic = async () => {
    try {
        const topicId = route.params.id;
        await topicComposable.editTopic(title.value, topicId);

        notifyUser('Tópico editado com sucesso', 'success');
        emit('close');
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

const titleHint = computed(() => (`(${title.value.length} de ${TITLE_MAX_LENGTH} caracteres)`));

onMounted(loadTopic);
</script>

<template>
    <CardForm title="Editar tópico" @send="editTopic" formId="edit-topic-form" @close="emit('close')">
        <FormInput v-model="title" label="Título do tópico" :rules="[validateTitle]" :hint="titleHint" />
    </CardForm>
</template>