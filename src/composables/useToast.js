import { reactive } from 'vue';

const toast = reactive({
    type: 'success',
    text: ''
});

function showToast(type = 'success', message) {
    toast.type = type;
    toast.text = message;

    setTimeout(() => {
        closeToast();
    }, 5000);
}

function closeToast() {
    toast.type = '';
    toast.text = '';
}

export function useToast() {
    return {
        toast,
        showToast,
        closeToast
    };
}