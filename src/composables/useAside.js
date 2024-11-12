import { ref } from "vue";

const isActive = ref(false);

export const useAside = () => {
    const toggleMenu = () => (isActive.value = !isActive.value);
    const closeMenu = () => (isActive.value = false);
    const showMenu = () => (isActive.value = true);

    return {
        isActive,
        toggleMenu,
        closeMenu,
        showMenu
    }
}