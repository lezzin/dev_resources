import errorMessages from "./errorMessages";
import { TITLE_MAX_LENGTH } from "./variables";

export const validateLink = (val) => {
    const urlRegex = /^(http|https):\/\//i;
    return urlRegex.test(val) || errorMessages.invalidLink;
};

export const validateTitle = (val) => {
    if (!val) {
        return errorMessages.requiredTitle;
    }

    if (val.length > TITLE_MAX_LENGTH) {
        return errorMessages.maximumSize;
    }
}

export const validateEmail = (val) => {
    if (!val) {
        return errorMessages.requiredEmail || 'O email é obrigatório.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(val) || 'Por favor, insira um email válido.';
};

export const validatePassword = (val) => {
    if (!val) {
        return errorMessages.requiredPassword || 'A senha é obrigatória.';
    }

    return val.length >= 6 || 'A senha deve ter no mínimo 6 caracteres.';
};

export const validateSearch = (val) => {
    return val.length >= 4 || 'A pesquisa deve ter no mínimo 4 caracteres.';
};