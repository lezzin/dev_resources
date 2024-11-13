import { ref } from "vue";

const isActive = ref(false);

const toggleMenu = () => (isActive.value = !isActive.value);
const closeMenu = () => (isActive.value = false);
const showMenu = () => (isActive.value = true);

export const useAside = () => {
    return {
        isActive,
        toggleMenu,
        closeMenu,
        showMenu
    }
}