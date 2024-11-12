<script setup>
import { QBtn, QImg, useQuasar } from 'quasar';
import { useAside } from '../composables/useAside';
import { onMounted } from 'vue';
const $q = useQuasar();
const asideComposable = useAside();

onMounted(() => (document.title = "Ferramentas para Devs"));
</script>

<template>
    <section>
        <div class="column justify-center items-center text-center" style="min-height: calc(80vh - 43px);">
            <QImg src="../assets/img/einstein.webp" :ratio="16 / 9"
                :style="`max-width: ${$q.screen.lt.md ? 100 : 62}%;`" class="rounded-borders" />

            <h2 :class="`q-mb-md text-primary ${$q.screen.lt.md ? 'text-h4' : 'text-h2'}`">
                Olá, bem-vindo ao site de ferramentas para devs
            </h2>

            <h3 class="text-h5 q-mb-md">
                Aqui você encontrará diversos materiais e links úteis para estudos e desenvolvimento de
                projetos.
            </h3>

            <QBtn color="primary" label="Navegar pelos tópicos" icon="start" @click="asideComposable.showMenu" />
        </div>

        <p :class="`q-mt-lg q-pt-lg text-center ${$q.dark.isActive ? '' : 'text-dark'}`">
            <span>Criado com ❤️ por </span>
            <a href="https://lezzin.github.io" target="_blank" style="color: inherit;">lezzin</a>
        </p>
    </section>
</template>
