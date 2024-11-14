import errorMessages from "./errorMessages";
import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from "./variables";

export const validateLink = (val) => {
    if (!val) {
        return errorMessages.requiredLink;
    }

    const urlRegex = /^(http|https):\/\//i;
    return urlRegex.test(val) || errorMessages.invalidLink;
};

export const validateTitle = (val) => {
    if (!val) {
        return errorMessages.requiredTitle;
    }

    if (val?.length > TITLE_MAX_LENGTH) {
        return errorMessages.maximumTitleSize;
    }
}

export const validateDescription = (val) => {
    if (!val) {
        return errorMessages.requiredDescription;
    }

    if (val?.length > DESCRIPTION_MAX_LENGTH) {
        return errorMessages.maximumDescriptionSize;
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

    return val?.length >= 6 || 'A senha deve ter no mínimo 6 caracteres.';
};

export const validateSearch = (val) => {
    if (!val || val.trim().length === 0) {
        return true;
    }

    return val.trim().length >= 4 || 'A pesquisa deve ter no mínimo 4 caracteres.';
};
