<script setup>
import { useRoute, useRouter } from 'vue-router';
import { QInput, QPage } from 'quasar';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import errorMessages from '../utils/errorMessages';
import { validateLink } from '../utils/validations';
import { notifyUser } from '../utils/notification';
import { useAuth } from '../stores/useAuth';
import { useContent } from '../composables/useContent';
import { PAGE_TITLE } from '../utils/variables';

import FormCard from '../components/FormCard.vue';

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

onMounted(() => (document.title = `${PAGE_TITLE} Adicionar conteúdo`));
</script>

<template>
    <QPage padding>
        <FormCard title="Adicionar novo conteúdo" @send="addContent" formId="new-link-form">
            <QInput outlined dense hide-bottom-space v-model="contentTitle" label="Título do site/material"
                :rules="[val => !!val || errorMessages.requiredTitle]" />

            <QInput outlined dense hide-bottom-space v-model="contentLink" label="Link do site/material"
                :rules="[val => !!val || errorMessages.requiredLink, validateLink]" />

            <QInput outlined dense hide-bottom-space v-model="contentDescription" label="Descrição do site/material"
                :rules="[val => !!val || errorMessages.requiredDescription]" />
        </FormCard>
    </QPage>
</template>
