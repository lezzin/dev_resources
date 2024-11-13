<script setup>
import errorMessages from "../utils/errorMessages";
import { auth } from '../firebase';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from "pinia";

import { useAuth } from '../stores/useAuth';

import { QBtn, QInput, QPage, useQuasar } from "quasar";
import FormCard from "../components/layout/FormCard.vue";
import { validateEmail, validatePassword } from "../utils/validations";

const router = useRouter();
const $q = useQuasar();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const email = ref('');
const password = ref('');

const loginUser = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/');
    } catch (error) {
        $q.notify({
            message: errorMessages[error.code] || errorMessages.generalError,
            color: 'red'
        });
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
        <FormCard title="Entrar como administrador" @send="loginUser">
            <template #form>
                <QInput outlined dense hide-bottom-space v-model="email" label="Email" type="email"
                    :rules="[validateEmail]" />

                <QInput outlined dense hide-bottom-space v-model="password" label="Senha" type="password"
                    :rules="[validatePassword]" />

                <QBtn type="submit" color="primary" label="Entrar" />
            </template>
        </FormCard>
    </QPage>
</template>
