<script>
import { RouterLink } from 'vue-router';
import Navbar from './Navbar.vue';
import { inject, ref } from 'vue';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default {
    components: {
        Navbar
    },
    setup() {
        const isMenuActive = ref(false);
        const isMobile = inject('isMobile');
        const toast = inject('toast');
        const user = inject('user');

        const toggleMenu = () => {
            isMenuActive.value = !isMenuActive.value;
        };

        const logoutUser = async () => {
            try {
                await signOut(auth);
            } catch ({ code, message }) {
                const errors = {
                    "auth/network-request-failed":
                        "Falha na conexão de rede. Verifique sua conexão e tente novamente.",
                    "auth/internal-error": "Erro interno do servidor. Tente novamente mais tarde.",
                    "auth/no-current-user": "Nenhum usuário autenticado no momento.",
                };

                toast.value = {
                    type: 'error',
                    text: errors[code] ?? `Erro ao sair: ${message}`
                };
            }
        };

        return {
            isMobile,
            isMenuActive,
            user,
            logoutUser,
            toggleMenu
        };
    }
}
</script>

<template>
    <aside>
        <div class="fixed">
            <div class="header-top">
                <button class="btn-primary" @click="toggleMenu" title="Abrir/fechar menu"
                    v-if="isMobile || isMenuActive">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <RouterLink to="/" title="Ir para a página inicial">
                    <img src="../assets/img/logo.svg" alt="Laptop com três engrenagens na tela" width="32" height="32">
                </RouterLink>
                <div class="header-top-buttons">
                    <RouterLink class="btn-primary" to="/topic-form" v-if="user"
                        title="Ir para o formulário de tópicos">
                        <i class="fa-solid fa-plus"></i>
                    </RouterLink>

                    <RouterLink class="btn-success" to="/profile" v-if="user" title="Acessar perfil de administrador">
                        <i class="fa-solid fa-user"></i>
                    </RouterLink>

                    <button class="btn-danger" @click="logoutUser" v-if="user" title="Sair do modo administrador">
                        <i class="fa-solid fa-sign-out"></i>
                    </button>

                    <RouterLink class="btn-primary" to="/login" v-if="!user" title="Entrar no modo administrador">
                        <i class="fa-solid fa-sign-in"></i>
                    </RouterLink>
                </div>
            </div>

            <Navbar :isActive="isMenuActive" />
        </div>
    </aside>
</template>


<style scoped>
aside {
    position: relative;
}

.fixed {
    border-right: 1px solid #dcddf5;
    position: fixed;
    max-width: 25%;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
}

.header-top {
    padding: 0.9rem 3rem;
    border-bottom: 1px solid #dcddf5;
    align-items: center;
    height: 10vh;
}

.header-top-buttons {
    margin-left: auto;
}

@media (max-width: 768px) {
    .fixed {
        position: static;
        max-width: unset;
        border-right: unset;
        overflow-y: unset;
        height: auto;
    }

    .header-top {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        margin-bottom: 0;
        padding: 1rem;
    }
}
</style>
