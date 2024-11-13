<script setup>
import errorMessages from '../utils/errorMessages';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuth } from '../stores/useAuth';
import { QBtn, QBtnGroup, QInput, QPage, useQuasar } from 'quasar';
import FormCard from '../components/layout/FormCard.vue';
import { validateLink } from '../utils/validations';
import { useContent } from '../composables/useContent';

const $q = useQuasar();
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
        await contentComposable.addContent(contentTopicId.value, contentDescription.value, contentLink.value, contentTitle.value, user.value.uid);

        $q.notify({
            message: "Conteúdo adicionado com sucesso",
            color: 'green'
        });

        router.push('/topic/' + contentTopicId.value);
    } catch (error) {
        console.log(error);

        $q.notify({
            message: errorMessages[error.code] || errorMessages.generalError,
            color: 'red'
        })
    }
};

onMounted(() => (document.title = `Ferramentas para Devs | Adicionar conteúdo`));
</script>

<template>
    <QPage padding>
        <FormCard title="Adicionar novo link" @send="addContent">
            <template #form>
                <QInput outlined dense hide-bottom-space v-model="contentTitle" label="Título do site/material"
                    :rules="[val => !!val || errorMessages.requiredTitle]" />

                <QInput outlined dense hide-bottom-space v-model="contentLink" label="Link do site/material"
                    :rules="[val => !!val || errorMessages.requiredLink, validateLink]" />

                <QInput outlined dense hide-bottom-space v-model="contentDescription" label="Descrição do site/material"
                    :rules="[val => !!val || errorMessages.requiredDescription]" />

                <QBtnGroup>
                    <QBtn type="submit" color="primary" icon="add" label="Adicionar"
                        :disabled="!contentTitle || !contentLink || !contentDescription" />
                    <QBtn flat color="red" @click="() => $router.back()" icon="arrow_back" label="Voltar" />
                </QBtnGroup>
            </template>
        </FormCard>
    </QPage>
</template>
