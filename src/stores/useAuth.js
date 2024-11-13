import { auth } from '../utils/firebase';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { notifyUser } from '../utils/notification';

export const useAuth = defineStore('auth', () => {
    const user = ref(auth.currentUser);

    function initAuthListener() {
        onAuthStateChanged(auth, (currentUser) => {
            user.value = currentUser;
        });
    }

    initAuthListener();

    const logout = async () => {
        try {
            await signOut(auth);
        } catch ({ code, message }) {
            const errors = {
                "auth/network-request-failed":
                    "Falha na conexão de rede. Verifique sua conexão e tente novamente.",
                "auth/internal-error": "Erro interno do servidor. Tente novamente mais tarde.",
                "auth/no-current-user": "Nenhum usuário autenticado no momento.",
            };

            notifyUser(errors[code] ?? `Erro ao sair: ${message}`, 'error');
        }
    };

    return { user, logout };
});