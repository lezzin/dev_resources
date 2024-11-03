<script>
import { ref, watch, onMounted, inject } from 'vue';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import errorMessages from "../utils/errorMessages";
import { useRoute, useRouter } from 'vue-router';
import { db } from "../firebase";

export default {
    components: {
        InputField: () => import("../components/inputField.vue")
    },
    setup() {
        const user = inject('user');
        const toast = inject('toast');
        const router = useRouter();
        const route = useRoute();

        const topicTitle = ref('');
        const titleError = ref('');
        const topicError = ref('');

        const editTopic = async () => {
            titleError.value = '';
            topicError.value = '';

            if (!topicTitle.value) {
                titleError.value = errorMessages.requiredTitle;
                return;
            }

            try {
                const topicId = route.params.id; 
                const topicRef = doc(db, 'topics', topicId);

                await updateDoc(topicRef, {
                    title: topicTitle.value
                });

                toast.value = {
                    type: 'success',
                    text: 'Tópico editado com sucesso',
                };
                router.push(`/topic/${topicId}`);
            } catch (error) {
                handleError(error);
            }
        };

        const handleError = (error) => {
            titleError.value = error.message || errorMessages.generalError;
        };

        const loadTopic = async () => {
            try {
                const topicId = route.params.id;
                const topicRef = doc(db, 'topics', topicId);
                const docSnap = await getDoc(topicRef);

                if (!docSnap.exists()) {
                    topicError.value = errorMessages.topicNotFound;
                    return;
                }

                const topicData = docSnap.data();
                topicTitle.value = topicData.title;
            } catch (error) {
                handleError(error);
            }
        };

        onMounted(() => {
            document.title = `Ferramentas para Devs | Editar Tópico`;
            if (!user.value) router.push('/');
            loadTopic();
        });

        watch(user, (newUser) => {
            if (!newUser) router.push('/');
        });

        return {
            topicTitle,
            titleError,
            topicError,
            editTopic,
        };
    },
};
</script>

<template>
    <form @submit.prevent="editTopic" class="form">
        <p class="error-text" v-if="topicError">{{ topicError }}</p>

        <div class="header-top form_header">
            <h2 class="title">Editar Tópico</h2>
            <a class="btn-outline-primary" href="javascript:history.back()" title="Voltar para a página anterior">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
        </div>

        <div class="form_body">
            <InputField label="Título" id="topic-title" v-model="topicTitle" :error="titleError"
                placeholder="Estudos, materiais..." />

            <button class="btn-primary" title="Editar tópico">Editar</button>
        </div>
    </form>
</template>