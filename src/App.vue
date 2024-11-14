<script setup>
import { QDrawer, QHeader, QLayout, QPageContainer, QScrollArea, setCssVar, useQuasar } from 'quasar';
import { computed, toRef, watchEffect } from 'vue';
import { RouterView } from 'vue-router';

import { useAside } from './composables/useAside';

import AppHeader from './components/layout/AppHeader.vue';
import AppNavbar from './components/layout/AppNavbar.vue';

const $q = useQuasar();

const asideComposable = useAside();
const isMenuActive = toRef(asideComposable.isActive);

const asideBackground = computed(() => (`${$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-3'} shadow-2`));

watchEffect(() => setCssVar('negative', $q.dark.isActive ? '#f44336' : 'red'));
</script>

<template>
    <QLayout view="hHh lpR lFf">
        <QHeader>
            <AppHeader />
        </QHeader>

        <QDrawer v-model="isMenuActive" :class="asideBackground" :width="350">
            <QScrollArea class="fit">
                <AppNavbar @toggle="asideComposable.toggleMenu" />
            </QScrollArea>
        </QDrawer>

        <QPageContainer>
            <RouterView />
        </QPageContainer>
    </QLayout>
</template>
