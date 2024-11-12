<script setup>
import errorMessages from '../utils/errorMessages';
import { db } from '../firebase';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuth } from '../stores/useAuth';
import FormCard from '../components/layout/FormCard.vue';
import { QBtn, QBtnGroup, QInput, useQuasar } from 'quasar';
import { validateLink } from '../utils/validations';
import { useContent } from '../composables/useContent';

const $q = useQuasar();
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
        const topicId = route.params.id;
        const contentId = route.params.contentId;

        const topicRef = doc(db, 'topics', topicId);
        const docSnap = await getDoc(topicRef);

        if (!docSnap.exists()) {
            $q.notify({
                message: errorMessages.topicNotFound,
                color: 'red'
            });
            return;
        }

        const topicData = docSnap.data();
        const content = topicData.contents.find(content => content.id === contentId);

        if (!content) {
            $q.notify({
                message: errorMessages.contentNotFound,
                color: 'red'
            });
            return;
        }

        contentDescription.value = content.description;
        contentLink.value = content.link;
        contentTitle.value = content.title;
    } catch (error) {
        handleError(error);
    }
};

const editContent = async () => {
    const contentId = route.params.contentId;
    const topicId = route.params.id;

    try {
        await contentComposable.editContent(contentId, topicId, contentDescription.value, contentLink.value, contentTitle.value, user.value.uid);

        $q.notify({
            message: 'Conteúdo editado com sucesso',
            color: 'green'
        });

        router.push('/topic/' + topicId);
    } catch (error) {
        handleError(error.code);
    }
};

const handleError = (error) => {
    $q.notify({
        message: error.message || errorMessages.generalError,
        color: 'red'
    });
};

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
    <FormCard title="Editar conteúdo" @send="editContent">
        <template #form>
            <QInput outlined dense hide-bottom-space v-model="contentTitle" label="Título do site/material"
                :rules="[val => !!val || errorMessages.requiredTitle]" />

            <QInput outlined dense hide-bottom-space v-model="contentLink" label="Link do site/material" :rules="[
                val => !!val || errorMessages.requiredLink,
                validateLink
            ]" />

            <QInput outlined dense hide-bottom-space v-model="contentDescription" label="Descrição do site/material"
                :rules="[val => !!val || errorMessages.requiredDescription]" />

            <QBtnGroup>
                <QBtn type="submit" color="primary" icon="edit" label="Editar" />
                <QBtn flat color="red" @click="() => $router.back()" icon="arrow_back" label="Voltar" />
            </QBtnGroup>
        </template>
    </FormCard>
</template>