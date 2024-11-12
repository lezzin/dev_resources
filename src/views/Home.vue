<script setup>
import { QImg, useQuasar } from 'quasar';
const $q = useQuasar();
</script>

<template>
    <section class="column justify-center items-center">
        <div class="text-primary">
            <h2 :class="`q-my-none ${$q.screen.lt.md ? 'text-h4' : 'text-h2'}`">
                Olá, usuário! Bem-vindo ao site de ferramentas para devs.
            </h2>

            <h3 class="text-h5">
                Aqui você encontrará diversos materiais e links úteis para estudos e desenvolvimento de
                projetos.
            </h3>
        </div>

        <QImg :ratio="16 / 9" src="/src/assets/img/einstein.webp" alt="Albert Einstein utilizando um computador - IA"
            class="shadow-4 q-mb-lg rounded-borders">
            <div class="absolute-bottom">
                Imagem gerada por inteligência artificial
            </div>
        </QImg>

        <p class="text-center g-mb-none">
            <span>Criado com ❤️ por </span>
            <a href="https://lezzin.github.io" target="_blank" class="text-dark">lezzin</a>
        </p>
    </section>
</template>
