<script setup>
import { QBtn, QImg, QPage, useQuasar } from 'quasar';
import { useAside } from '../composables/useAside';
import { onMounted } from 'vue';
const $q = useQuasar();
const asideComposable = useAside();

onMounted(() => (document.title = "Ferramentas para Devs"));
</script>

<template>
    <QPage>
        <section class="column justify-between q-pa-md">
            <div class="column justify-center items-center text-center q-mx-auto"
                style="min-height: calc(80vh - 43px); max-width: 720px;">
                <QImg src="../assets/logo.svg" width="144px" height="144px" />

                <h2
                    :class="`q-mb-md ${$q.dark.isActive ? 'text-white' : 'text-dark'} text-weight-bold ${$q.screen.lt.md ? 'text-h4' : 'text-h2'}`">
                    Bem-vindo ao Hub de Ferramentas para Devs
                </h2>

                <h3 :class="`${$q.dark.isActive ? 'text-grey-2' : 'text-dark'} text-h5 q-mt-none q-mb-lg`">
                    Descubra materiais essenciais, recursos úteis e links para impulsionar seu aprendizado e seus
                    projetos.
                </h3>

                <div class="q-gutter-sm flex items-center justify-center">
                    <QBtn color="primary" rounded size="lg" label="Explorar ferramentas" icon="rocket_launch"
                        @click="asideComposable.showMenu" />

                    <QBtn :color="$q.dark.isActive ? 'white' : 'dark'" rounded outline size="lg" label="Sugerir um link"
                        icon="mail_outline" href="https://lezzin.github.io#contact-section" target="_blank" />
                </div>
            </div>

            <p class="q-mt-lg text-center">
                <span>Criado com ☕ por </span>
                <a href="https://lezzin.github.io" target="_blank" style="color: inherit;">lezzin</a>
            </p>
        </section>
    </QPage>
</template>

<style lang="scss" scoped>
section {
    background-image: linear-gradient(180deg, rgba($primary, 0.01), rgba($primary, 0.8) 85%),
        radial-gradient(ellipse at top left, rgba($secondary, 0.5), transparent 50%),
        radial-gradient(ellipse at top right, rgba($accent, 0.5), transparent 50%),
        radial-gradient(ellipse at center right, rgba($purple, 0.5), transparent 50%),
        radial-gradient(ellipse at center left, rgba($pink, 0.5), transparent 50%);
    min-height: 92vh;
}
</style>