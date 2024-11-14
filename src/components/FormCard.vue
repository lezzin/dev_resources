<script setup>
import { QBtn, QCard, QCardActions, QCardSection, QForm, QSeparator } from 'quasar';

const emit = defineEmits(["send", "close"]);

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    formId: {
        type: String,
        required: true
    },
    isNotDialog: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <QCard flat bordered class="my-card">
        <QCardSection>
            <h2 class="text-h5 q-ma-none">{{ props.title }}</h2>
        </QCardSection>

        <QSeparator />

        <QCardSection class="q-px-sm">
            <QForm @submit.prevent="emit('send')" :id="formId" class="q-gutter-sm">
                <slot></slot>
            </QForm>
        </QCardSection>

        <QCardActions align="right" class="q-gutter-sm">
            <QBtn type="submit" color="primary" icon="check" label="Enviar" :form="formId" />
            <QBtn v-if="isNotDialog" color="negative" outline icon="arrow_back" label="Voltar"
                @click="$router.back()" />
            <QBtn v-else color="negative" outline icon="cancel" label="Fechar" @click="$emit('close')" />
        </QCardActions>
    </QCard>
</template>

<style scoped>
.my-card {
    width: 100%;
    max-width: 500px;
}
</style>