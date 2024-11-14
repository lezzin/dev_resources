<script setup>
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { validateDescription, validateLink, validateTitle } from '../../utils/validations';
import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from '../../utils/variables';
import errorMessages from '../../utils/errorMessages';
import { notifyUser } from '../../utils/notification';
import { useContent } from '../../composables/useContent';
import { useAuth } from '../../stores/useAuth';

import FormCard from '../../components/FormCard.vue';
import MyInput from '../../components/MyInput.vue';

const emit = defineEmits(["close"]);

const contentComposable = useContent();

const route = useRoute();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const contentTitle = ref('');
const contentLink = ref('');
const contentDescription = ref('');
const contentTopicId = ref(route.params.id);

const addContent = async () => {
    try {
        await contentComposable.addContent(
            contentTopicId.value,
            contentDescription.value,
            contentLink.value,
            contentTitle.value,
            user.value.uid
        );

        emit('close');
        notifyUser("Conteúdo adicionado com sucesso", 'success');
    } catch (error) {
        notifyUser(errorMessages[error.code] || errorMessages.generalError(error), 'error');
    }
};

const titleHint = computed(() => {
    return `Insira até ${TITLE_MAX_LENGTH} caracteres - (${contentTitle.value.length} de ${TITLE_MAX_LENGTH})`;
});

const descriptionHint = computed(() => {
    return `Insira até ${DESCRIPTION_MAX_LENGTH} caracteres - (${contentDescription.value.length} de ${DESCRIPTION_MAX_LENGTH})`;
});
</script>

<template>
    <FormCard title="Adicionar conteúdo" @send="addContent" formId="add-link-form" @close="emit('close')">
        <MyInput v-model="contentTitle" label="Título do site/material" :rules="[validateTitle]" :hint="titleHint" />

        <MyInput v-model="contentDescription" label="Descrição do site/material" :rules="[validateDescription]"
            :hint="descriptionHint" />

        <MyInput v-model="contentLink" label="Link do site/material" :rules="[validateLink]" />
    </FormCard>
</template>