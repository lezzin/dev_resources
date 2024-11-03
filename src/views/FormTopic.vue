<script>
import errorMessages from '../utils/errorMessages';
import { inject, onMounted, ref, watch } from 'vue';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { db } from '../firebase';

export default {
    components: {
        InputField: () => import("../components/inputField.vue")
    },
    setup() {
        const title = ref('');
        const titleError = ref('');
        const user = inject("user");
        const toast = inject("toast");
        const router = useRouter();

        const addTopic = async () => {
            titleError.value = '';

            if (!title.value) {
                titleError.value = errorMessages.requiredTitle;
                return;
            }

            try {
                const topicsRef = collection(db, 'topics');
                const q = query(topicsRef, where('title', '==', title.value));

                const querySnapshot = await getDocs(q);

                if (querySnapshot.size > 0) {
                    titleError.value = errorMessages.topicExists;
                    return;
                }

                const docRef = await addDoc(topicsRef, {
                    title: title.value,
                    contents: [],
                    created_at: new Date(),
                    created_by: user.value.uid,
                });

                const createdTopicId = docRef.id;
                title.value = '';
                titleError.value = '';
                toast.value = {
                    type: 'success',
                    text: 'Tópico adicionado com sucesso'
                };
                router.push(`/topic/${createdTopicId}`);
            } catch (error) {
                handleError(error);
            }
        };

        const handleError = (error) => {
            this.titleError = error.message || this.$root.error_messages.generalError;
        }

        onMounted(() => {
            document.title = `Ferramentas para Devs | Adicionar tópico`;

            if (!user) {
                router.push("/");
            }
        })

        watch(user, (newUser) => {
            if (!newUser) {
                router.push("/");
            }
        });

        watch(title, () => {
            titleError.value = "";
        });

        return {
            addTopic,
            title,
            titleError
        }
    }
}
</script>

<template>
    <form @submit.prevent="addTopic" class="form">
        <div class="header-top form_header">
            <h2 class="title">Adicionar Tópico</h2>
            <a class="btn-outline-primary" href="javascript:history.back()" title="Voltar para a página anterior">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
        </div>

        <div class="form_body">
            <InputField label="Título" id="topic-title" v-model="title" :error="titleError"
                placeholder="Estudos, materiais..." />

            <button class="btn-primary" title="Adicionar tópico">Adicionar</button>
        </div>
    </form>
</template>