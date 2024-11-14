import { ref } from "vue";

export const useModal = () => {
    const show = ref(false);
    const component = ref(false);

    return {
        show,
        component,
        hideModal: () => show.value = false
    }
}