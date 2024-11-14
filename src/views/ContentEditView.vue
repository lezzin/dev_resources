<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue';
import { QPage } from 'quasar';
import { storeToRefs } from 'pinia';

import errorMessages from '../utils/errorMessages';
import { useAuth } from '../stores/useAuth';
import { validateDescription, validateLink, validateTitle } from '../utils/validations';
import { useContent } from '../composables/useContent';
import { notifyUser } from '../utils/notification';
import { DESCRIPTION_MAX_LENGTH, PAGE_TITLE, TITLE_MAX_LENGTH } from '../utils/variables';

import FormCard from '../components/FormCard.vue';
import MyInput from '../components/MyInput.vue';

const contentComposable = useContent();

const router = useRouter();
const route = useRoute();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const contentTopicId = ref('');
const contentDescription = ref('');
const contentLink = ref('');
const contentTitle = ref('');

const loadContent = async () => {
    try {
        const { id: topicId, contentId } = route.params;
        const { link, description, title } = await contentComposable.loadContent(contentId, topicId);

        contentLink.value = link;
        contentTitle.value = title;
        contentDescription.value = description;
    } catch (error) {
        handleError(error);
    }
};

const editContent = async () => {
    const contentId = route.params.contentId;
    const topicId = route.params.id;

    try {
        await contentComposable.editContent(
            contentId,
            topicId,
            contentDescription.value,
            contentLink.value,
            contentTitle.value
        );

        notifyUser('Conteúdo editado com sucesso', 'success');
        router.push('/topic/' + topicId);
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    notifyUser(errorMessages[error.code] || errorMessages.generalError(error), 'error');
}

const titleHint = computed(() => {
    return `Insira até ${TITLE_MAX_LENGTH} caracteres - (${contentTitle.value.length} de ${TITLE_MAX_LENGTH})`;
});

const descriptionHint = computed(() => {
    return `Insira até ${DESCRIPTION_MAX_LENGTH} caracteres - (${contentDescription.value.length} de ${DESCRIPTION_MAX_LENGTH})`;
});

onMounted(() => {
    document.title = `${PAGE_TITLE} Editar conteúdo`;
    contentTopicId.value = route.params.id;
    loadContent();
});

watch(user, (newUser) => {
    if (!newUser) router.push('/');
});
</script>

<template>
    <QPage>
        <FormCard title="Editar conteúdo" @send="editContent" formId="edit-link-form">
            <MyInput v-model="contentTitle" label="Título do site/material" :rules="[validateTitle]"
                :hint="titleHint" />

            <MyInput v-model="contentDescription" label="Descrição do site/material" :rules="[validateDescription]"
                :hint="descriptionHint" />

            <MyInput v-model="contentLink" label="Link do site/material" :rules="[validateLink]" />
        </FormCard>
    </QPage>
</template>