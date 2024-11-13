<script setup>
import { auth } from '../utils/firebase';

import { sendPasswordResetEmail } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuth } from '../stores/useAuth';

import FormCard from '../components/layout/FormCard.vue';
import { QInput, QPage, useQuasar } from 'quasar';
import { validateEmail } from '../utils/validations';
import { notifyUser } from '../utils/notification';
import errorMessages from '../utils/errorMessages';

const $q = useQuasar();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const email = ref("");

const updatePassword = async () => {
    try {
        await sendPasswordResetEmail(auth, email.value);
        notifyUser('E-mail enviado com sucesso', 'success');
    } catch (error) {
        notifyUser(errorMessages.generalError(error), 'error');
    }
}

onMounted(() => {
    document.title = `Ferramentas para Devs | Perfil`;
    email.value = user.value.email;
});
</script>

<template>
    <QPage padding>
        <FormCard title="Seu perfil de administrador" @send="updatePassword" formId="profile-form">
            <QInput outlined dense hide-bottom-space v-model="email" label="Email" type="email"
                :rules="[validateEmail]" />
        </FormCard>
    </QPage>
</template>
