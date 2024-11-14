import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from "./variables";

export default {
    // Authentication errors
    "auth/network-request-failed": "Falha na conexão de rede. Verifique sua conexão e tente novamente.",
    "auth/internal-error": "Erro interno do servidor. Tente novamente mais tarde.",
    "auth/no-current-user": "Nenhum usuário autenticado no momento.",
    "auth/invalid-credential": "Email ou senha inválidos",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde",
    "logoutError": "Erro ao deslogar, se o erro persistir, recarregue a página",

    // Topic errors
    "topicExists": "Esse tópico já existe",
    "topicNotFound": "Esse tópico não existe",
    "fetchTopicsError": "Erro ao carregar tópicos",

    // Content errors
    "contentNotFound": "Conteúdo não encontrado",
    "requiredLink": "Preencha o link",
    "invalidLink": "Inicie o link com http:// ou https://",
    "requiredTitle": "Preencha o título",
    "requiredDescription": "Preencha a descrição",

    "maximumTitleSize": `Insira menos que ${TITLE_MAX_LENGTH} caracteres.`,
    "maximumDescriptionSize": `Insira menos que ${DESCRIPTION_MAX_LENGTH} caracteres.`,

    generalError: (error) => ("Erro desconhecido: " + error?.message),
};
