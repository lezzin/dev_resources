import { auth } from '../utils/firebase';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';

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
        } catch (error) {
            throw error;
        }
    };

    return { user, logout };
});