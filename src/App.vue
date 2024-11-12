<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { QBtn, QDrawer, QHeader, QImg, QLayout, QPage, QPageContainer, QScrollArea, QToolbar, QTooltip } from 'quasar';
import { useAuth } from './stores/useAuth';
import { storeToRefs } from 'pinia';
import { auth } from './firebase';
import Navbar from './components/Navbar.vue';
import { useAside } from './composables/useAside';
import { toRef } from 'vue';

const asideComposable = useAside();
const isMenuActive = toRef(asideComposable.isActive);

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const logoutUser = async () => {
    await authUser.logout(auth);
};

</script>

<template>
    <QLayout view="lHh lpR lFf">
        <QHeader :class="`text-white ${$q.dark.isActive ? 'bg-dark' : 'bg-grey-4'} shadow-2`">
            <QToolbar class="row items-center q-py-sm">
                <QBtn :color="`${$q.dark.isActive ? 'white' : 'dark'}`" @click="asideComposable.showMenu" flat round
                    icon="menu" class="q-mr-sm">
                    <QTooltip>Alternar menu lateral</QTooltip>
                </QBtn>

                <RouterLink to="/">
                    <QImg src="./assets/logo.svg" width="32px" height="32px" />
                </RouterLink>

                <div class="q-ml-auto q-gutter-sm items-center">
                    <QBtn round unelevated :color="`${$q.dark.isActive ? 'grey-9' : 'secondary'}`" to="/topic-form"
                        icon="add" v-if="user">
                        <QTooltip>Adicionar novo tópico</QTooltip>
                    </QBtn>

                    <QBtn round unelevated :color="`${$q.dark.isActive ? 'grey-9' : 'secondary'}`" to="/profile"
                        icon="person" v-if="user">
                        <QTooltip>Visualizar perfil de administrador</QTooltip>
                    </QBtn>

                    <QBtn round unelevated color="red" @click="logoutUser" icon="logout" v-if="user">
                        <QTooltip>Sair do perfil de administrador</QTooltip>
                    </QBtn>

                    <QBtn v-if="!user" unelevated :color="`${$q.dark.isActive ? 'grey-10' : 'secondary'}`" to="/login"
                        icon="admin_panel_settings" label="Admin" />

                    <QBtn round unelevated :color="`${$q.dark.isActive ? 'grey-9' : 'secondary'}`"
                        @click="() => $q.dark.toggle()" :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'">
                        <QTooltip>Alternar o tema</QTooltip>
                    </QBtn>
                </div>
            </QToolbar>
        </QHeader>

        <QDrawer v-model="isMenuActive" overlay side="left"
            :class="`${$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-3'} shadow-2`" :width="350">
            <QScrollArea class="fit">
                <Navbar @toggle="asideComposable.closeMenu" />
            </QScrollArea>
        </QDrawer>

        <QPageContainer>
            <QPage padding>
                <RouterView />
            </QPage>
        </QPageContainer>
    </QLayout>
</template>
