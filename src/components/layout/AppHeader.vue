<script setup>
import { QBtn, QIcon, QImg, QItem, QItemSection, QList, QMenu, QToolbar, QTooltip, useQuasar } from 'quasar';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useAuth } from '../../stores/useAuth';
import { useAside } from '../../composables/useAside';
import { notifyUser } from '../../utils/notification';
import errorMessages from '../../utils/errorMessages';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase';

import SearchForm from '../layout/SearchForm.vue';
import { computed } from 'vue';

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

const sendPasswordEmail = async () => {
    try {
        await sendPasswordResetEmail(auth, user.value.email);
        notifyUser('E-mail de redefinição enviado com sucesso', 'success');
    } catch (error) {
        notifyUser(errorMessages.generalError(error), 'error');
    }
}

const currentModeTooltip = computed(() => ($q.dark.isActive ? 'Ativar modo claro' : 'Ativar modo escuro'));
const currentModeIcon = computed(() => ($q.dark.isActive ? 'light_mode' : 'dark_mode'));
const currentModeColor = computed(() => ($q.dark.isActive ? 'yellow' : 'grey-5'));
</script>

<template>
    <QToolbar class="row items-center justify-between q-py-sm" style="min-height: 8vh;">
        <div>
            <QBtn @click="asideComposable.toggleMenu" flat round icon="menu" class="q-mr-sm">
                <QTooltip>Alternar menu lateral</QTooltip>
            </QBtn>

            <RouterLink to="/">
                <QImg src="../../assets/logo.svg" width="32px" height="32px" />
            </RouterLink>
        </div>

        <div class="row q-gutter-sm items-center">
            <SearchForm />

            <div class="row items-center" v-if="user">
                <QBtn round unelevated color="secondary" to="/topic-form" icon="add">
                    <QTooltip>Adicionar novo tópico</QTooltip>
                </QBtn>

                <QBtn round unelevated color="secondary" icon="person" class="q-mx-sm">
                    <QMenu transition-show="jump-down" transition-hide="jump-up" :offset="[0, 15]">
                        <QList>
                            <QItem clickable>
                                <QItemSection avatar>
                                    <QIcon color="primary" name="password" />
                                </QItemSection>
                                <QItemSection @click.stop="sendPasswordEmail" no-wrap>Alterar senha</QItemSection>
                            </QItem>
                            <QItem clickable>
                                <QItemSection avatar>
                                    <QIcon color="negative" name="logout" />
                                </QItemSection>
                                <QItemSection @click.stop="logoutUser">Sair</QItemSection>
                            </QItem>
                        </QList>
                    </QMenu>
                </QBtn>

                <QBtn round unelevated color="red" @click="logoutUser" icon="logout">
                    <QTooltip>Sair do perfil de administrador</QTooltip>
                </QBtn>
            </div>

            <QBtn round unelevated flat color="white" to="/login" icon="admin_panel_settings" v-else>
                <QTooltip>Acessar perfil de administrador</QTooltip>
            </QBtn>

            <QBtn round unelevated flat :color="currentModeColor" :icon="currentModeIcon" @click="$q.dark.toggle()">
                <QTooltip>{{ currentModeTooltip }}</QTooltip>
            </QBtn>
        </div>
    </QToolbar>
</template>