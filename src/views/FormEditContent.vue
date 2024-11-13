<script setup>
import errorMessages from '../utils/errorMessages';

import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuth } from '../stores/useAuth';
import FormCard from '../components/layout/FormCard.vue';
import { QInput, QPage } from 'quasar';
import { validateLink } from '../utils/validations';
import { useContent } from '../composables/useContent';
import { notifyUser } from '../utils/notification';

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

        contentDescription.value = description;
        contentLink.value = link;
        contentTitle.value = title;
    } catch (error) {
        handleError(error);
    }
};

const editContent = async () => {
    const contentId = route.params.contentId;
    const topicId = route.params.id;

    try {
        await contentComposable.editContent(contentId, topicId, contentDescription.value, contentLink.value, contentTitle.value, user.value.uid);

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
    document.title = `Ferramentas para Devs | Editar conteúdo`;
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