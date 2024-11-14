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
    "addTopicError": "Erro ao adicionar tópico. Tente novamente",
    "editTopicError": "Erro ao editar tópico. Tente novamente",
    "deleteTopicError": "Erro ao deletar tópico. Tente novamente",
    "topicExists": "Esse tópico já existe",
    "topicNotFound": "Esse tópico não existe",
    "loadTopicError": "Erro ao carregar tópico. Tente novamente",
    "fetchTopicsError": "Erro ao carregar tópicos",

    // Content errors
    "addContentError": "Erro ao adicionar conteúdo. Tente novamente",
    "editContentError": "Erro ao editar conteúdo. Tente novamente",
    "deleteContentError": "Erro ao deletar conteúdo. Tente novamente",
    "contentNotFound": "Conteúdo não encontrado",
    "requiredLink": "Preencha o link",
    "invalidLink": "Inicie o link com http:// ou https://",
    "requiredTitle": "Preencha o título",
    "requiredDescription": "Preencha a descrição",

    "maximumTitleSize": `Insira menos que ${TITLE_MAX_LENGTH} caracteres.`,
    "maximumDescriptionSize": `Insira menos que ${DESCRIPTION_MAX_LENGTH} caracteres.`,

    generalError: (error) => ("Erro desconhecido: " + error?.message),
};
