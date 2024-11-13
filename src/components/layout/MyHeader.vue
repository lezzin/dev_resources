<script setup>
import { QBtn, QImg, QToolbar, QTooltip, useQuasar } from 'quasar';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useAuth } from '../../stores/useAuth';
import { useAside } from '../../composables/useAside';
import { notifyUser } from '../../utils/notification';
import errorMessages from '../../utils/errorMessages';

const $q = useQuasar();

const authUser = useAuth();
const { user } = storeToRefs(authUser);
const asideComposable = useAside();

const logoutUser = async () => {
    try {
        await authUser.logout();
    } catch (error) {
        notifyUser(errorMessages[error.code] ?? errorMessages.generalError(error), 'error');
    }
};
</script>

<template>
    <QToolbar class="row items-center q-py-sm" style="min-height: 8vh;">
        <QBtn @click="asideComposable.toggleMenu" flat round icon="menu" class="q-mr-sm">
            <QTooltip>Alternar menu lateral</QTooltip>
        </QBtn>

        <RouterLink to="/">
            <QImg src="../../assets/logo.svg" width="32px" height="32px" />
        </RouterLink>

        <div class="q-ml-auto q-gutter-sm items-center">
            <QBtn round unelevated color="secondary" to="/topic-form" icon="add" v-if="user">
                <QTooltip>Adicionar novo tópico</QTooltip>
            </QBtn>

            <QBtn round unelevated color="secondary" to="/profile" icon="person" v-if="user">
                <QTooltip>Visualizar perfil de administrador</QTooltip>
            </QBtn>

            <QBtn round unelevated color="red" @click="logoutUser" icon="logout" v-if="user">
                <QTooltip>Sair do perfil de administrador</QTooltip>
            </QBtn>

            <QBtn round unelevated outline color="white" to="/login" icon="admin_panel_settings" v-if="!user">
                <QTooltip>Acessar perfil de administrador</QTooltip>
            </QBtn>

            <QBtn round unelevated color="secondary" @click="() => $q.dark.toggle()"
                :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'">
                <QTooltip>Alternar o tema</QTooltip>
            </QBtn>
        </div>
    </QToolbar>
</template>