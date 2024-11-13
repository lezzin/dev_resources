<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { QInput, QPage } from 'quasar';

import { useAuth } from '../stores/useAuth';
import errorMessages from '../utils/errorMessages';
import { validateTitle } from '../utils/validations';
import { useTopic } from '../composables/useTopic';
import { notifyUser } from '../utils/notification';

import FormCard from '../components/FormCard.vue';

const router = useRouter();
const topicComposable = useTopic();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const title = ref('');

const addTopic = async () => {
    try {
        const createdTopicId = await topicComposable.addTopic(title.value, user.value.uid);
        notifyUser('Tópico adicionado com sucesso', 'success');
        router.push(`/topic/${createdTopicId}`);
    } catch (error) {
        notifyUser(errorMessages[error.message] || errorMessages.generalError(error), 'error');
    }
};

onMounted(() => (document.title = `Ferramentas para Devs | Adicionar tópico`));
</script>

<template>
    <QPage padding>
        <FormCard title="Adicionar novo tópico" @send="addTopic" formId="add-topic-form">
            <QInput outlined dense hide-bottom-space v-model="title" label="Título do tópico"
                :rules="[validateTitle]" />
        </FormCard>
    </QPage>
</template>