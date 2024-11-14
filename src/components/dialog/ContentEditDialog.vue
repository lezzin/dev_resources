<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

import { validateDescription, validateLink, validateTitle } from '../../utils/validations';
import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from '../../utils/variables';
import errorMessages from '../../utils/errorMessages';
import { useContent } from '../../composables/useContent';
import { notifyUser } from '../../utils/notification';

import FormCard from '../../components/FormCard.vue';
import MyInput from '../../components/MyInput.vue';

const emit = defineEmits(["close"]);

const props = defineProps({
    contentId: {
        type: String,
        required: true
    }
})

const contentComposable = useContent();

const route = useRoute();

const contentTopicId = ref('');
const contentDescription = ref('');
const contentLink = ref('');
const contentTitle = ref('');

const loadContent = async () => {
    try {
        const { link, description, title } = await contentComposable.loadContent(props.contentId, contentTopicId.value);

        contentLink.value = link;
        contentTitle.value = title;
        contentDescription.value = description;
    } catch (error) {
        handleError(error);
    }
};

const editContent = async () => {
    try {
        await contentComposable.editContent(
            props.contentId,
            contentTopicId.value,
            contentDescription.value,
            contentLink.value,
            contentTitle.value
        );

        emit('close');
        notifyUser('Conteúdo editado com sucesso', 'success');
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    notifyUser(errorMessages[error.code] || errorMessages.generalError(error), 'error');
}

const titleHint = computed(() => (`Insira até ${TITLE_MAX_LENGTH} caracteres - (${contentTitle.value.length} de ${TITLE_MAX_LENGTH})`));
const descriptionHint = computed(() => (`Insira até ${DESCRIPTION_MAX_LENGTH} caracteres - (${contentDescription.value.length} de ${DESCRIPTION_MAX_LENGTH})`));

onMounted(() => {
    contentTopicId.value = route.params.id;
    loadContent();
});
</script>

<template>
    <FormCard title="Editar conteúdo" @send="editContent" formId="edit-link-form" @close="emit('close')">
        <MyInput v-model="contentTitle" label="Título do site/material" :rules="[validateTitle]" :hint="titleHint" />

        <MyInput v-model="contentDescription" label="Descrição do site/material" :rules="[validateDescription]"
            :hint="descriptionHint" />

        <MyInput v-model="contentLink" label="Link do site/material" :rules="[validateLink]" />
    </FormCard>
</template>