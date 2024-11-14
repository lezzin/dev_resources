<script setup>
import { sendPasswordResetEmail } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { QPage } from 'quasar';

import errorMessages from '../utils/errorMessages';
import { auth } from '../utils/firebase';
import { useAuth } from '../stores/useAuth';
import { validateEmail } from '../utils/validations';
import { notifyUser } from '../utils/notification';
import { PAGE_TITLE } from '../utils/variables';
import { useRouter } from 'vue-router';

import FormCard from '../components/FormCard.vue';
import MyInput from '../components/MyInput.vue';

const router = useRouter();

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
    document.title = `${PAGE_TITLE} Perfil`;
    email.value = user.value.email;
});

watch(user, (newUser) => {
    if (!newUser) router.push('/');
});
</script>

<template>
    <QPage>
        <FormCard title="Seu perfil de administrador" @send="updatePassword" formId="profile-form" isNotDialog>
            <MyInput v-model="email" label="Email" type="email" :rules="[validateEmail]" />
        </FormCard>
    </QPage>
</template>
