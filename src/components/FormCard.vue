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
    <section :class="isNotDialog && 'not-dialog row justify-center items-center q-pa-md'">
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

            <QCardActions align="right" class="q-gutter-sm">
                <QBtn type="submit" color="primary" icon="check" label="Enviar formulário" :form="formId" />
                <QBtn v-if="isNotDialog" color="negative" outline icon="cancel" label="Voltar"
                    @click="$router.back()" />
                <QBtn v-else color="negative" outline icon="cancel" label="Fechar" @click="$emit('close')" />
            </QCardActions>
        </QCard>
    </section>
</template>

<style scoped>
.my-card {
    width: 100%;
    max-width: 500px;
}

.not-dialog {
    min-height: 90vh;
}
</style>