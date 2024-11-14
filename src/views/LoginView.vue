<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { QPage } from "quasar";
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from "pinia";

import errorMessages from "../utils/errorMessages";
import { validateEmail, validatePassword } from "../utils/validations";
import { auth } from '../utils/firebase';
import { useAuth } from '../stores/useAuth';
import { notifyUser } from "../utils/notification";
import { PAGE_TITLE } from '../utils/variables';

import FormCard from "../components/FormCard.vue";
import MyInput from '../components/MyInput.vue';

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
    document.title = `${PAGE_TITLE} Login`;

    if (user.value?.uid) {
        router.push("/");
    }
});
</script>

<template>
    <QPage>
        <FormCard title="Entrar como administrador" @send="loginUser" formId="login-form" isNotDialog>
            <MyInput v-model="email" label="Email" type="email" :rules="[validateEmail]" />
            <MyInput v-model="password" label="Senha" type="password" :rules="[validatePassword]" />
        </FormCard>
    </QPage>
</template>
