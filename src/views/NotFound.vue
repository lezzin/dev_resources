<script setup lang="ts">
import { QBtn, QIcon } from 'quasar';
</script>

<template>
    <section class="q-pa-md flex flex-center">
        <div class="text-center">
            <h1 class="text-h1 q-my-md">404</h1>
            <h2 class="text-h4 q-mt-md">Oops! Página não encontrada</h2>
            <p>A página que você está procurando não existe ou foi movida.</p>
            <QBtn label="Ir para o início" color="primary" @click="$router.push('/')" class="q-mt-lg" />
        </div>
    </section>
</template>