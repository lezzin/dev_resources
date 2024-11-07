<script setup>
import { toRef } from 'vue';

const emit = defineEmits(["close"]);

const props = defineProps({
    toast: {
        type: Object,
        required: true
    }
});

const toast = toRef(props.toast);

const closeToast = () => {
    emit('close');
};
</script>

<template>
    <div v-if="toast.type && toast.text" :class="['toast', `${toast.type}-toast active`]">
        <div class="toast-banner"></div>

        <div class="toast-content text">
            <div class="toast-icon">
                <i :class="['fa-solid', toast.type === 'error' ? 'fa-xmark' : 'fa-check']"></i>
            </div>

            <div>
                <p class="toast-title">{{ toast.type === 'error' ? 'Erro' : 'Sucesso' }}</p>
                <p class="toast-text">{{ toast.text }}</p>
            </div>

            <button class="btn-close" @click="closeToast" title="Fechar mensagem">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
.toast {
    --__color: transparent;

    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    display: grid;
    grid-template-columns: 1.8rem 1fr;
    box-shadow: 0 1rem 3rem #0000002d;
    border: 1px solid #dcddf5;
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
    z-index: 999;
    opacity: 0;
    transform: translateX(100%);
    pointer-events: none;
    transition: all 0.3s ease;
}

.toast.active {
    transform: translateX(0);
    opacity: 1;
    pointer-events: all;
}

.toast-banner,
.toast-icon {
    background-color: var(--__color);
}

.toast.success-toast {
    --__color: #00A699;
}

.toast.error-toast {
    --__color: #FF5A5F;
}

.toast-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 1rem 1.5rem;
}

.toast-icon {
    display: grid;
    place-items: center;
    width: 2.4rem;
    aspect-ratio: 1;
    border-radius: 50%;
    color: #fff;
}

.toast-title {
    font-size: 1.6rem;
    font-weight: 600;
}

.toast-text {
    font-size: 1.4rem;
}

.btn-close {
    align-self: flex-start;
    margin-left: 1rem;
    color: #555;
}

.btn-close i {
    font-size: 1.4rem;
}
</style>