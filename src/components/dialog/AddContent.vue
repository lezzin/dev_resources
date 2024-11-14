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

import CardForm from '../form/CardForm.vue';
import FormInput from '../form/FormInput.vue';

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

const titleHint = computed(() => (`(${contentTitle.value.length} de ${TITLE_MAX_LENGTH} caracteres)`));
const descriptionHint = computed(() => (`(${contentDescription.value.length} de ${DESCRIPTION_MAX_LENGTH} caracteres)`));
</script>

<template>
    <CardForm title="Adicionar conteúdo" @send="addContent" formId="add-link-form" @close="emit('close')">
        <FormInput v-model="contentTitle" label="Título do site/material" :rules="[validateTitle]" :hint="titleHint" />

        <FormInput v-model="contentDescription" label="Descrição do site/material" :rules="[validateDescription]"
            :hint="descriptionHint" />

        <FormInput v-model="contentLink" label="Link do site/material" :rules="[validateLink]" />
    </CardForm>
</template>