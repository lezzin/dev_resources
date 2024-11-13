<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { QInput, QPage } from 'quasar';
import { storeToRefs } from 'pinia';

import errorMessages from '../utils/errorMessages';
import { useAuth } from '../stores/useAuth';
import { validateLink } from '../utils/validations';
import { useContent } from '../composables/useContent';
import { notifyUser } from '../utils/notification';
import { PAGE_TITLE } from '../utils/variables';

import FormCard from '../components/FormCard.vue';

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
    <QPage padding>
        <FormCard title="Editar conteúdo" @send="editContent" formId="edit-link-form">
            <QInput outlined dense hide-bottom-space v-model="contentTitle" label="Título do site/material"
                :rules="[val => !!val || errorMessages.requiredTitle]" />

            <QInput outlined dense hide-bottom-space v-model="contentLink" label="Link do site/material" :rules="[
                val => !!val || errorMessages.requiredLink,
                validateLink
            ]" />

            <QInput outlined dense hide-bottom-space v-model="contentDescription" label="Descrição do site/material"
                :rules="[val => !!val || errorMessages.requiredDescription]" />
        </FormCard>
    </QPage>
</template>