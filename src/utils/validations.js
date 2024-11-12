import errorMessages from "./errorMessages";

export const validateLink = (val) => {
    const urlRegex = /^(http|https):\/\//i;
    return urlRegex.test(val) || errorMessages.invalidLink;
};

export const validateTitle = (val) => {
    if (!val) {
        return errorMessages.requiredTitle;
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