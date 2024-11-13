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
        <div class="column justify-center items-center text-center q-mx-auto"
            style="min-height: calc(80vh - 43px); max-width: 720px;">
            <QImg src="../assets/logo.svg" width="144px" height="144px" class="hover-effect" />

            <h2 :class="`q-mb-md text-primary text-weight-bold ${$q.screen.lt.md ? 'text-h4' : 'text-h2'}`">
                Bem-vindo ao Hub de Ferramentas para Devs
            </h2>

            <h3 :class="`${$q.dark.isActive ? 'text-grey-6' : 'text-dark'} text-h5 q-mt-none q-mb-lg`">
                Descubra materiais essenciais, recursos úteis e links para impulsionar seu aprendizado e seus projetos.
            </h3>

            <div class="q-gutter-sm flex items-center justify-center">
                <QBtn color="primary" label="Explore as Ferramentas" icon="rocket_launch"
                    @click="asideComposable.showMenu" />

                <QBtn :color="$q.dark.isActive ? 'secondary' : 'dark'" outline label="Sugerir um link"
                    icon="mail_outline" href="https://lezzin.github.io#contact-section" target="_blank" />
            </div>
        </div>

        <p :class="`q-mt-lg q-pt-lg text-center ${$q.dark.isActive ? '' : 'text-dark'}`">
            <span>Criado com ❤️ por </span>
            <a href="https://lezzin.github.io" target="_blank" style="color: inherit;">lezzin</a>
        </p>
    </section>
</template>

<style lang="scss">
.hover-effect {
    transition: scale .3s ease-in-out;

    &:hover {
        scale: 1.05;
    }
}
</style>