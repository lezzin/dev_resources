<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    },
    error: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    }
});

const emit = defineEmits(['update:modelValue']);

const { modelValue } = toRefs(props);

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <div class="input-group">
        <label :for="props.id">{{ props.label }}</label>
        <input :type="props.type" :id="props.id" :value="modelValue" @input="updateValue"
            :class="{ 'error-input': props.error }" :placeholder="props.placeholder" />
        <p class="error-text" v-if="props.error">{{ props.error }}</p>
    </div>
</template>

<style scoped>
.input-group {
    display: grid;
    width: 100%;
    gap: 0.3rem;
}

input {
    padding: 0.6rem 1.2rem;
    border: 1px solid #dcddf5;
    border-radius: 0.3rem;
    width: 100%;
}

.error-input {
    border-color: #FF5A5F;
    outline-color: #FF5A5F;
}
</style>
