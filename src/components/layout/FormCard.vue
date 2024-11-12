<script setup>
import { QCard, QCardSection, QForm, QSeparator } from 'quasar';

const emit = defineEmits(["send"]);

const props = defineProps({
    title: {
        type: String,
        required: true
    },
})
</script>

<template>
    <div class="flex justify-center">
        <QCard class="full-width" style="max-width: 500px;">
            <QCardSection>
                <h2 class="text-h4 q-ma-none">{{ props.title }}</h2>
            </QCardSection>

            <QSeparator />

            <QCardSection class="full-width">
                <QForm @submit.prevent="emit('send')" class="q-gutter-sm">
                    <slot name="form"></slot>
                </QForm>
            </QCardSection>
        </QCard>
    </div>
</template>
