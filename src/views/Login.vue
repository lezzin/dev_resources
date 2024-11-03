<script>
import { inject, onMounted, ref } from 'vue';
import errorMessages from "../utils/errorMessages";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import InputField from '../components/InputField.vue';

export default {
    components: {
        InputField
    },
    setup() {
        const email = ref('');
        const emailError = ref('');
        const password = ref('');
        const passwordError = ref('');
        const formMessage = ref(null);
        const router = useRouter();

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

            const user = inject("user");
            if (user.value !== null) {
                router.push("/");
            }
        });

        return {
            formMessage,
            email,
            password,
            emailError,
            passwordError,
            loginUser
        }
    }
};
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
