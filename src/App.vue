<script setup>
import { RouterView } from 'vue-router';
import { QBtn, QDrawer, QHeader, QImg, QLayout, QPage, QPageContainer, QScrollArea, QToolbar, QTooltip } from 'quasar';
import { useAuth } from './stores/useAuth';
import { storeToRefs } from 'pinia';
import { auth } from './firebase';
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';


const authUser = useAuth();
const { user } = storeToRefs(authUser);

const isMenuActive = ref(false);
const toggleMenu = () => (isMenuActive.value = !isMenuActive.value);

const logoutUser = async () => {
    await authUser.logout(auth);
};

</script>

<template>
    <QLayout view="hHh lpR lFf">
        <QHeader elevated class="bg-primary text-white">
            <QToolbar class="row items-center q-py-sm" style="max-width: 1080px; margin: 0 auto">
                <QBtn @click="toggleMenu" flat round icon="menu" class="q-mr-sm">
                    <QTooltip>Alternar menu lateral</QTooltip>
                </QBtn>

                <QImg src="./assets/logo.svg" width="32px" height="32px" />

                <div class="q-ml-auto">
                    <div v-if="user" class="q-gutter-sm items-center">
                        <QBtn round unelevated color="secondary" to="/topic-form" icon="add">
                            <QTooltip>Adicionar novo tópico</QTooltip>
                        </QBtn>

                        <QBtn round unelevated color="secondary" to="/profile" icon="person">
                            <QTooltip>Visualizar perfil de administrador</QTooltip>
                        </QBtn>

                        <QBtn round unelevated color="red" @click="logoutUser" icon="logout">
                            <QTooltip>Sair do perfil de administrador</QTooltip>
                        </QBtn>
                    </div>

                    <QBtn v-else unelevated color="primary" to="/login" icon="admin_panel_settings" label="Admin" />
                </div>
            </QToolbar>
        </QHeader>

        <QDrawer v-model="isMenuActive" overlay side="left" bordered class="bg-grey-3 shadow-2" :width="350">
            <QScrollArea class="fit">
                <Navbar />
            </QScrollArea>
        </QDrawer>

        <QPageContainer style="max-width: 1080px; margin: 0 auto">
            <QPage padding>
                <RouterView />
            </QPage>
        </QPageContainer>
    </QLayout>
</template>