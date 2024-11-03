<template>
    <form @submit.prevent="addContent" class="form">
        <div class="header-top form_header">
            <h2 class="title">Adicionar conteúdo</h2>
            <a class="btn-outline-primary" href="javascript:history.back()" title="Voltar para a página anterior">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
        </div>

        <div class="form_body">
            <p class="error-text" v-if="topicError">{{ topicError }}</p>

            <InputField
                label="Título"
                id="content-title"
                v-model="contentTitle" 
                :error="contentTitleError"
                placeholder="Título do site/material" 
            />

            <InputField
                label="Link"
                id="content-link"
                v-model="contentLink" 
                :error="contentLinkError"
                placeholder="https://www.site.com..." 
            />

            <InputField
                label="Descrição"
                id="content-description"
                v-model="contentDescription"
                :error="contentDescriptionError"
                placeholder="Descrição do site/material" 
            />

            <button class="btn-primary" title="Adicionar conteúdo">Adicionar</button>
        </div>
    </form>
</template>

<script>
import { inject, onMounted, ref, watch } from 'vue';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';
import { db } from "../firebase";
import errorMessages from '../utils/errorMessages';
import InputField from '../components/InputField.vue';

export default {
    components: {
        InputField
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        const toast = inject("toast");
        const user = inject("user");

        const topicError = ref('');
        const contentTitle = ref('');
        const contentTitleError = ref('');
        const contentLink = ref('');
        const contentLinkError = ref('');
        const contentDescription = ref('');
        const contentDescriptionError = ref('');
        const contentTopicId = ref(route.params.id);

        watch(contentTitle, () => contentTitleError.value = "");
        watch(contentDescription, () => contentDescriptionError.value = "");
        watch(contentLink, () => contentLinkError.value = "");

        const addContent = async () => {
            contentDescriptionError.value = '';
            contentLinkError.value = '';
            contentTitleError.value = '';

            if (!contentTitle.value) contentTitleError.value = errorMessages.requiredTitle;
            if (!contentLink.value) contentLinkError.value = errorMessages.requiredLink;
            if (!contentDescription.value) contentDescriptionError.value = errorMessages.requiredDescription;

            if (!contentTitle.value || !contentLink.value || !contentDescription.value) return;

            const urlRegex = /^(http|https):\/\//i;
            if (!urlRegex.test(contentLink.value)) {
                contentLinkError.value = errorMessages.invalidLink;
                return;
            }

            try {
                const topicId = contentTopicId.value;
                const topicRef = doc(db, 'topics', topicId);
                const docSnap = await getDoc(topicRef);
                if (!docSnap.exists()) {
                    topicError.value = errorMessages.topicNotFound;
                    return;
                }

                const topicData = docSnap.data();
                topicData.contents.push({
                    id: Date.now().toString(36),
                    description: contentDescription.value,
                    link: contentLink.value,
                    title: contentTitle.value,
                    created_by: user.value.uid,
                });

                await updateDoc(topicRef, { contents: topicData.contents });
                router.push(`/topic/${topicId}`);
                clearFields();
                toast.value = {
                    type: 'success',
                    text: "Conteúdo adicionado com sucesso"
                };
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

        const handleError = (error) => {
            topicError.value = error.message || errorMessages.generalError;
        };

        onMounted(() => {
            document.title = `Ferramentas para Devs | Adicionar conteúdo`;

            if (!user) {
                router.push("/");
            }
        })

        return {
            topicError,
            contentDescriptionError,
            contentDescription,
            contentLinkError,
            contentLink,
            contentTitleError,
            contentTitle,
            contentTopicId,
            addContent,
            clearFields,
            handleError,
        };
    },
};
</script>
