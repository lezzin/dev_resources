import { DESCRIPTION_MAX_LENGTH, SEARCH_MIN_LENGTH, TITLE_MAX_LENGTH } from "./variables";
import errorMessages from "./errorMessages";

const validateLength = (val, maxLength, errorMessage) => (val.length <= maxLength || errorMessage);

export const validateLink = (val) => {
    if (!val) return errorMessages.requiredLink;
    return /^(http|https):\/\//i.test(val) || errorMessages.invalidLink;
};

export const validateTitle = (val) => {
    if (!val) return errorMessages.requiredTitle;
    return validateLength(val, TITLE_MAX_LENGTH, errorMessages.maximumTitleSize);
};

export const validateDescription = (val) => {
    if (!val) return errorMessages.requiredDescription;
    return validateLength(val, DESCRIPTION_MAX_LENGTH, errorMessages.maximumDescriptionSize);
};

export const validateEmail = (val) => {
    if (!val) return errorMessages.requiredEmail || 'O email é obrigatório.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Por favor, insira um email válido.';
};

export const validatePassword = (val) => {
    if (!val) return errorMessages.requiredPassword || 'A senha é obrigatória.';
    return val.length >= 6 || 'A senha deve ter no mínimo 6 caracteres.';
};

export const validateSearch = (val) => {
    if (!val?.trim()) return true;
    return val.trim().length >= SEARCH_MIN_LENGTH || `A pesquisa deve ter no mínimo ${SEARCH_MIN_LENGTH} caracteres.`;
};
