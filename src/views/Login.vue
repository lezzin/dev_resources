<script setup>
import errorMessages from "../utils/errorMessages";
import { auth } from '../firebase';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from "pinia";

import { useAuth } from '../stores/useAuth';

import InputField from '../components/InputField.vue';

const router = useRouter();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const email = ref('');
const emailError = ref('');
const password = ref('');
const passwordError = ref('');
const formMessage = ref(null);

const loginUser = async () => {
    formMessage.value = null;
    emailError.value = '';
    passwordError.value = '';

    if (!email.value) {
        emailError.value = errorMessages.requiredEmail;
    }

    if (!password.value) {
        passwordError.value = errorMessages.requiredPassword;
    }

    if (!email.value || !password.value) {
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/');
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    const errorMessage = errorMessages[error.code] || "Erro desconhecido. Tente novamente mais tarde.";
    formMessage.value = {
        type: 'error',
        text: errorMessage
    };
}

onMounted(() => {
    document.title = `Ferramentas para Devs | Login`;

    if (user?.value?.uid) {
        router.push("/");
    }
});
</script>

<template>
    <form @submit.prevent="loginUser" class="form">
        <div class="header-top form_header">
            <h2 class="title">Entrar como administrador</h2>
        </div>

        <div class="form_body">
            <p class="box-text" :class="formMessage ? `${formMessage.type}-text` : ''" v-if="formMessage">
                {{ formMessage.text }}
            </p>

            <InputField label="Email" id="email" v-model="email" :error="emailError" placeholder="seuemail@email.com"
                type="email" />
            <InputField label="Senha" id="password" v-model="password" :error="passwordError" placeholder="*******"
                type="password" />

            <button class="btn-primary" title="Entrar como administrador">Entrar</button>
        </div>
    </form>
</template>
