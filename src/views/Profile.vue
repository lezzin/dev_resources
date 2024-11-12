<script setup>
import { auth } from '../firebase';

import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuth } from '../stores/useAuth';

import FormCard from '../components/layout/FormCard.vue';
import { QBtn, QInput, useQuasar } from 'quasar';
import { validateEmail } from '../utils/validations';

const router = useRouter();
const $q = useQuasar();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const email = ref("");

const updatePassword = async () => {
    try {
        await sendPasswordResetEmail(auth, email.value);

        $q.notify({
            message: 'E-mail enviado com sucesso',
            color: 'green'
        });
    } catch (error) {
        $q.notify({
            message: error.message,
            color: 'red'
        });
    }
}

onMounted(() => {
    document.title = `Ferramentas para Devs | Perfil`;
    email.value = user.value.email;
});
</script>

<template>
    <FormCard title="Seu perfil de administrador" @send="updatePassword">
        <template #form>
            <form @submit.prevent="updatePassword" class="q-gutter-sm">
                <QInput outlined dense hide-bottom-space v-model="email" label="Email" type="email"
                    :rules="[validateEmail]" />

                <QBtn color="primary" type="submit" title="Alterar senha" label="Alterar senha" :disabled="!email" />
            </form>
        </template>
    </FormCard>
</template>
