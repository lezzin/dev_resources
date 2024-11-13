<script setup>
import errorMessages from '../utils/errorMessages';
import { db } from '../firebase';

import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuth } from '../stores/useAuth';

import { QBtn, QBtnGroup, QInput, QPage, useQuasar, } from 'quasar';
import FormCard from '../components/layout/FormCard.vue';
import { validateTitle } from '../utils/validations';
import { useTopic } from '../composables/useTopic';

const router = useRouter();
const $q = useQuasar();
const topicComposable = useTopic();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const title = ref('');

const addTopic = async () => {
    try {
        const createdTopicId = await topicComposable.addTopic(title.value, user.value.uid);

        $q.notify({
            message: 'Tópico adicionado com sucesso',
            color: 'green'
        });

        router.push(`/topic/${createdTopicId}`);
    } catch (error) {
        console.log(error);
        $q.notify({
            message: errorMessages[error.message] || errorMessages.generalError,
            color: 'red'
        });
    }
};

onMounted(() => (document.title = `Ferramentas para Devs | Adicionar tópico`));
</script>

<template>
    <QPage padding>
        <FormCard title="Adicionar novo tópico" @send="addTopic">
            <template #form>
                <QInput outlined dense hide-bottom-space v-model="title" label="Título do tópico"
                    :rules="[validateTitle]" />

                <QBtnGroup>
                    <QBtn type="submit" color="primary" icon="add" label="Adicionar" :disabled="!title" />
                    <QBtn flat color="red" @click="() => $router.back()" icon="arrow_back" label="Voltar" />
                </QBtnGroup>
            </template>
        </FormCard>
    </QPage>
</template>