<script setup>
import { QImg, QBtn, QPage } from 'quasar';
</script>

<template>
    <QPage padding>
        <section class="flex flex-center justify-center q-py-xl">
            <div class="text-center q-gutter-lg column items-center full-width">
                <QImg src="../assets/img/not-found.svg" style="max-width: 600px; " />
                <QBtn label="Ir para o início" icon="home" color="primary" @click="$router.push('/')" />
            </div>
        </section>
    </QPage>
</template>