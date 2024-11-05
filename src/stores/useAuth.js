import { auth } from '../firebase';

import { onAuthStateChanged } from 'firebase/auth';
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

    return { user };
});