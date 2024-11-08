<script setup>
import errorMessages from '../utils/errorMessages';
import { db } from '../firebase';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useToast } from '../composables/useToast';
import { useAuth } from '../stores/useAuth';

import InputField from '../components/InputField.vue';

const router = useRouter();
const route = useRoute();

const { showToast } = useToast();
const authUser = useAuth();
const { user } = storeToRefs(authUser);

const topicError = ref('');
const contentTopicId = ref('');
const contentDescription = ref('');
const contentDescriptionError = ref('');
const contentLinkError = ref('');
const contentLink = ref('');
const contentTitleError = ref('');
const contentTitle = ref('');

watch(contentTitle, () => contentTitleError.value = "");
watch(contentDescription, () => contentDescriptionError.value = "");
watch(contentLink, () => contentLinkError.value = "");

const loadContent = async () => {
    try {
        const topicId = route.params.id;
        const contentId = route.params.contentId;

        const topicRef = doc(db, 'topics', topicId);
        const docSnap = await getDoc(topicRef);

        if (!docSnap.exists()) {
            topicError.value = errorMessages.topicNotFound;
            return;
        }

        const topicData = docSnap.data();
        const content = topicData.contents.find(content => content.id === contentId);


        if (!content) {
            router.push(`/topic/${topicId}`);
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
    try {
        clearErrors();

        if (!contentTitle.value) {
            contentTitleError.value = errorMessages.requiredTitle;
            return;
        }

        if (!contentLink.value) {
            contentLinkError.value = errorMessages.requiredLink;
            return;
        }

        const urlRegex = /^(http|https):\/\//i;
        if (!urlRegex.test(contentLink.value)) {
            contentLinkError.value = errorMessages.invalidLink;
            return;
        }

        if (!contentDescription.value) {
            contentDescriptionError.value = errorMessages.requiredDescription;
            return;
        }

        const topicId = route.params.id;
        const contentId = route.params.contentId;
        const topicRef = doc(db, 'topics', topicId);
        const docSnap = await getDoc(topicRef);

        if (!docSnap.exists()) {
            topicError.value = errorMessages.topicNotFound;
            return;
        }

        const topicData = docSnap.data();
        const newContents = topicData.contents.map(content => {
            if (content.id === contentId) {
                return {
                    id: contentId,
                    description: contentDescription.value,
                    link: contentLink.value,
                    title: contentTitle.value,
                    created_by: user.value.uid,
                };
            }
            return content;
        });

        await updateDoc(topicRef, { contents: newContents });

        showToast('success', 'Conteúdo editado com sucesso');
        router.push(`/topic/${topicId}`);
        clearFields();
    } catch (error) {
        handleError(error);
    }
};

const clearFields = () => {
    topicError.value = '';
    contentDescription.value = '';
    contentDescriptionError.value = '';
    contentTitle.value = '';
    contentTitleError.value = '';
    contentLink.value = '';
    contentLinkError.value = '';
};

const clearErrors = () => {
    topicError.value = '';
    contentTitleError.value = '';
    contentLinkError.value = '';
    contentDescriptionError.value = '';
};

const handleError = (error) => {
    topicError.value = error.message || errorMessages.generalError;
};

onMounted(() => {
    document.title = `Ferramentas para Devs | Editar conteúdo`;
    contentTopicId.value = route.params.id;

    if (!user?.value?.uid) {
        router.push('/');
        return;
    }

    loadContent();
});

watch(user, (newUser) => {
    if (!newUser) router.push("/");
});
</script>

<template>
    <form @submit.prevent="editContent" class="form">
        <p class="error-text" v-if="topicError">{{ topicError }}</p>

        <div class="header-top form_header">
            <h2 class="title">Editar Conteúdo</h2>
            <a class="btn-outline-primary" href="javascript:history.back()" title="Voltar para a página anterior"><i
                    class="fa-solid fa-arrow-left"></i></a>
        </div>

        <div class="form_body">
            <InputField label="Título" id="content-title" v-model="contentTitle" :error="contentTitleError"
                placeholder="Título do site/material" />

            <InputField label="Link" id="content-link" v-model="contentLink" :error="contentLinkError"
                placeholder="https://www.site.com..." />

            <InputField label="Descrição" id="content-description" v-model="contentDescription"
                :error="contentDescriptionError" placeholder="Descrição do site/material" />

            <button class="btn-primary" title="Editar conteúdo">Editar</button>
        </div>
    </form>
</template>