<script setup>
import { toRef, watchEffect } from 'vue';
import { RouterView } from 'vue-router';
import { QDrawer, QHeader, QLayout, QPageContainer, QScrollArea, setCssVar, useQuasar } from 'quasar';

import { useAside } from './composables/useAside';

import MyHeader from './components/layout/MyHeader.vue';
import MyNavbar from './components/layout/MyNavbar.vue';

const $q = useQuasar();

const asideComposable = useAside();
const isMenuActive = toRef(asideComposable.isActive);

watchEffect(() => setCssVar('negative', $q.dark.isActive ? '#f44336' : 'red'));
</script>

<template>
    <QLayout view="hHh lpR lFf">
        <QHeader elevated>
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
