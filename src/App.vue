<script setup>
import { toRef } from 'vue';
import { RouterView } from 'vue-router';
import { QDrawer, QHeader, QLayout, QPageContainer, QScrollArea, useQuasar } from 'quasar';

import { useAside } from './composables/useAside';

import MyHeader from './components/layout/MyHeader.vue';
import MyNavbar from './components/layout/MyNavbar.vue';

const $q = useQuasar();

const asideComposable = useAside();
const isMenuActive = toRef(asideComposable.isActive);
</script>

<template>
    <QLayout view="hHh lpR lFf">
        <QHeader>
            <MyHeader />
        </QHeader>

        <QDrawer v-model="isMenuActive" :class="`${$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-3'} shadow-2`"
            :width="350">
            <QScrollArea class="fit">
                <MyNavbar @toggle="asideComposable.toggleMenu" />
            </QScrollArea>
        </QDrawer>

        <QPageContainer>
            <RouterView />
        </QPageContainer>
    </QLayout>
</template>
