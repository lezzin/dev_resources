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
    <section class="flex justify-center q-pa-md">
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

            <QCardActions :align="ACTIONS_ALIGNMENT">
                <QBtn type="submit" color="primary" icon="check" label="Enviar formulário" :form="formId" />
                <QBtn outline color="red" @click="$router.back()" icon="arrow_back" label="Voltar" class="q-ml-auto" />
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