<script setup>
import errorMessages from "../utils/errorMessages";
import { auth } from '../utils/firebase';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from "pinia";

import { useAuth } from '../stores/useAuth';

import { QInput, QPage } from "quasar";
import FormCard from "../components/layout/FormCard.vue";
import { validateEmail, validatePassword } from "../utils/validations";
import { notifyUser } from "../utils/notification";

const router = useRouter();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const email = ref('');
const password = ref('');

const loginUser = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/');
    } catch (error) {
        notifyUser(errorMessages[error.code] || errorMessages.generalError(error), 'error');
    }
};

onMounted(() => {
    document.title = `Ferramentas para Devs | Login`;

    if (user.value?.uid) {
        router.push("/");
    }
});
</script>

<template>
    <QPage padding>
        <FormCard title="Entrar como administrador" @send="loginUser" formId="login-form">
            <QInput outlined dense hide-bottom-space v-model="email" label="Email" type="email"
                :rules="[validateEmail]" />

            <QInput outlined dense hide-bottom-space v-model="password" label="Senha" type="password"
                :rules="[validatePassword]" />
        </FormCard>
    </QPage>
</template>
