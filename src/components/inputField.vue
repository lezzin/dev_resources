<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
    name: 'InputField',
    props: {
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
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { modelValue } = toRefs(props);

        const updateValue = (event) => {
            emit('update:modelValue', event.target.value); 
        };

        return {
            modelValue,
            updateValue
        };
    }
});
</script>

<template>
    <div class="input-group">
        <label :for="id">{{ label }}</label>
        <input :type="type" :id="id" :value="modelValue" @input="updateValue" :class="{ 'error-input': error }"
            :placeholder="placeholder" autocomplete="off" />
        <p class="error-text" v-if="error">{{ error }}</p>
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
