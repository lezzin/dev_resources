<script setup>
import { useRoute, useRouter } from 'vue-router';
import { QPage } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import errorMessages from '../utils/errorMessages';
import { validateDescription, validateLink, validateTitle } from '../utils/validations';
import { notifyUser } from '../utils/notification';
import { useAuth } from '../stores/useAuth';
import { useContent } from '../composables/useContent';
import { DESCRIPTION_MAX_LENGTH, PAGE_TITLE, TITLE_MAX_LENGTH } from '../utils/variables';

import FormCard from '../components/FormCard.vue';
import MyInput from '../components/MyInput.vue';

const contentComposable = useContent();

const router = useRouter();
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

        notifyUser("Conteúdo adicionado com sucesso", 'success');
        router.push('/topic/' + contentTopicId.value);
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

onMounted(() => (document.title = `${PAGE_TITLE} Adicionar conteúdo`));
</script>

<template>
    <QPage>
        <FormCard title="Adicionar conteúdo" @send="addContent" formId="add-link-form">
            <MyInput v-model="contentTitle" label="Título do site/material" :rules="[validateTitle]"
                :hint="titleHint" />

            <MyInput v-model="contentDescription" label="Descrição do site/material" :rules="[validateDescription]"
                :hint="descriptionHint" />

            <MyInput v-model="contentLink" label="Link do site/material" :rules="[validateLink]" />
        </FormCard>
    </QPage>
</template>