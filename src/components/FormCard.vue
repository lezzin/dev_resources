<script setup>
import { QBtn, QCard, QCardActions, QCardSection, QForm, QSeparator } from 'quasar';

const emit = defineEmits(["send"]);

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    formId: {
        type: String,
        required: true
    },
})

const ACTIONS_ALIGNMENT = "right";
</script>

<template>
    <section class="flex justify-center items-center q-pa-md" style="min-height: 90vh;">
        <QCard flat bordered class="my-card">
            <QCardSection>
                <h2 class="text-h4 q-ma-none">{{ props.title }}</h2>
            </QCardSection>

            <QSeparator />

            <QCardSection class="q-px-sm">
                <QForm @submit.prevent="emit('send')" :id="formId" class="q-gutter-sm">
                    <slot></slot>
                </QForm>
            </QCardSection>

            <QCardActions :align="ACTIONS_ALIGNMENT" class="q-gutter-sm">
                <QBtn type="submit" color="primary" icon="check" label="Enviar formulário" :form="formId" />
                <QBtn color="red" @click="$router.back()" icon="arrow_back" label="Voltar" />
            </QCardActions>
        </QCard>
    </section>
</template>

<style scoped>
.my-card {
    width: 100%;
    max-width: 500px;
}
</style>