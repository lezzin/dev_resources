<script setup>
import { useRouter } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { QPage } from 'quasar';

import { useAuth } from '../stores/useAuth';
import errorMessages from '../utils/errorMessages';
import { validateTitle } from '../utils/validations';
import { useTopic } from '../composables/useTopic';
import { notifyUser } from '../utils/notification';
import { PAGE_TITLE, TITLE_MAX_LENGTH } from '../utils/variables';

import CardForm from '../components/form/CardForm.vue';
import FormInput from '../components/form/FormInput.vue';

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

const titleHint = computed(() => (`(${title.value.length} de ${TITLE_MAX_LENGTH} caracteres)`));

onMounted(() => (document.title = `${PAGE_TITLE} Adicionar tópico`));

watch(user, (newUser) => {
    if (!newUser) {
        router.push('/');
    }
})
</script>

<template>
    <QPage padding>
        <section class="row justify-center items-center q-pa-md">
            <CardForm title="Adicionar novo tópico" @send="addTopic" formId="add-topic-form" isNotDialog>
                <FormInput v-model="title" label="Título do tópico" :rules="[validateTitle]" :hint="titleHint" />
            </CardForm>
        </section>
    </QPage>
</template>