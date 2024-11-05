<script setup>
import errorMessages from '../utils/errorMessages';
import { auth } from '../firebase';

import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuth } from '../stores/useAuth';

import InputField from '../components/InputField.vue';

const router = useRouter();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const emailError = ref("");
const formMessage = ref("");
const email = ref("");

const updatePassword = async () => {
    formMessage.value = '';
    emailError.value = '';

    if (!email.value) {
        emailError.value = errorMessages.requiredEmail;
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email.value);
        formMessage.value = 'E-mail enviado com sucesso';
    } catch (error) {
        emailError.value = error.message;
    }
}

onMounted(() => {
    document.title = `Ferramentas para Devs | Perfil`;

    if (!user) {
        router.push("/");
    }

    email.value = user.value.email;
});

watch(user, (_) => {
    if (!_) {
        router.push("/");
    }
})
</script>

<template>
    <form @submit.prevent="updatePassword" class="form">
        <div class="header-top form_header">
            <h2 class="title">Seu perfil de usuário</h2>
        </div>

        <div class="form_body">
            <p class="box-text success-text" v-if="formMessage">{{ formMessage }}</p>

            <InputField label="Email" id="email" v-model="email" :error="emailError" placeholder="seuemail@email.com"
                type="email" />

            <button class="btn-primary" type="submit" title="Alterar senha">Alterar senha</button>
        </div>
    </form>
</template>
