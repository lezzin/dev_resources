<script>
import { ref, watch, onMounted, inject } from 'vue';
import { db } from '../firebase';
import { doc, getDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router'
import errorMessages from '../utils/errorMessages';

export default {
    setup() {
        const id = ref('');
        const title = ref('');
        const created_at = ref('');
        const contents = ref([]);
        const userIsCreator = ref(false);
        const contentsEmpty = ref(false);
        const user = inject("user");
        const toast = inject("toast");
        const router = useRouter();
        const route = useRoute();

        const loadTopic = async (topicId) => {
            try {
                const docRef = doc(db, "topics", topicId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const topicData = docSnap.data();

                    id.value = topicId;
                    title.value = topicData.title;
                    contents.value = topicData.contents;
                    created_at.value = topicData.created_at;
                    userIsCreator.value = user.value && user.value.uid === topicData.created_by;
                    contentsEmpty.value = contents.value.length === 0;
                    document.title = `Ferramentas para Devs | ${title.value}`;

                    sortContents();
                }
            } catch (error) {
                handleError("loadTopicError");
            }
        };

        const sortContents = () => {
            contents.value.sort((a, b) => {
                const descriptionA = a.description.toLowerCase();
                const descriptionB = b.description.toLowerCase();
                return descriptionA.localeCompare(descriptionB);
            });
        };

        const deleteTopic = async (topicId) => {
            if (!confirm('Tem certeza que deseja deletar esse tópico? Todo o conteúdo será perdido.')) return;

            try {
                await deleteDoc(doc(db, 'topics', topicId));
                toast.value = {
                    type: 'success',
                    text: "Tópico removido com sucesso"
                };

                router.push('/');
            } catch (error) {
                handleError('deleteTopicError');
            }
        };

        const deleteContent = async (id) => {
            if (!confirm('Tem certeza que deseja deletar esse conteúdo?')) return;

            try {
                const topicId = route.params.id;
                const docRef = doc(db, 'topics', topicId);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    router.push('/');
                }

                const topicData = docSnap.data();
                const newContents = topicData.contents.filter(content => content.id !== id);
                await updateDoc(docRef, { contents: newContents });

                toast.value = {
                    type: 'success',
                    text: "Conteúdo removido com sucesso"
                };
            } catch (error) {
                handleError('deleteContentError');
            }
        };

        const handleError = (errorMessage) => {
            toast.value = {
                type: 'error',
                text: errorMessages[errorMessage] || 'Erro desconhecido.'
            };
        };

        onMounted(() => {
            const topicId = route.params.id;
            loadTopic(topicId);

            const unsubscribe = onSnapshot(doc(db, 'topics', topicId), (docSnap) => {
                if (docSnap.exists()) {
                    const topicData = docSnap.data();
                    title.value = topicData.title;
                    contents.value = topicData.contents;

                    sortContents();
                }
            });

            return () => unsubscribe();
        });

        watch(() => route.params.id, (newId) => {
            loadTopic(newId);
        })

        watch(user, (newUser) => {
            user.value = newUser;
        });

        watch(contents, () => {
            contentsEmpty.value = contents.value.length === 0;
        })

        return {
            id,
            title,
            created_at,
            contents,
            user,
            userIsCreator,
            contentsEmpty,
            loadTopic,
            deleteTopic,
            deleteContent,
            handleError,
            sortContents
        };
    }
};
</script>

<template>
    <section>
        <div class="topic_header header-top" v-if="title">
            <h2 class="title">{{ title }}</h2>

            <div class="header-top-buttons">
                <RouterLink class="btn-primary" :to="`/topic/${id}/edit`" v-if="userIsCreator" title="Editar tópico">
                    <i class="fa-solid fa-edit"></i>
                </RouterLink>
                <button class="btn-danger" v-if="userIsCreator" @click="deleteTopic(id)" title="Remover tópico">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <RouterLink class="btn-primary" v-if="userIsCreator" :to="`/topic/${id}/content-form`">
                    <i class="fa-solid fa-plus"></i>
                </RouterLink>
            </div>
        </div>
        <div class="topic padding-container">
            <div v-if="contentsEmpty" class="topic-empty-image">
                <img src="../assets/img/content_empty_lg.webp" alt="ícone de caixa vazia" width="900" height="454"
                    class="lg">
                <img src="../assets/img/content_empty_sm.webp" alt="ícone de caixa vazia" width="568" height="454"
                    class="sm">
            </div>
            <div v-else class="topic-not-empty">
                <div class="table-responsive">
                    <table class="contents">
                        <thead>
                            <tr>
                                <th>Website</th>
                                <th>Descrição</th>
                                <th v-if="user">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="content" v-for="(content, index) in contents" :key="content.id">
                                <td>
                                    <a :href="content.link" target="_blank" rel="noopener noreferrer"
                                        class="content-link link" title="Acessar site">
                                        {{ content.title }}
                                    </a>
                                </td>
                                <td>
                                    <p class="content-description">{{ content.description }}</p>
                                </td>
                                <td v-if="user">
                                    <div class="content-actions">
                                        <RouterLink class="btn-primary"
                                            :to="`/topic/${$route.params.id}/content/${content.id}/edit`"
                                            v-if="user && user.uid == content.created_by" title="Editar conteúdo">
                                            <i class="fa-solid fa-edit"></i>
                                        </RouterLink>
                                        <button class="btn-danger" v-if="user && user.uid == content.created_by"
                                            @click="deleteContent(content.id)" title="Remover conteúdo">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.topic-empty-image {
    padding-top: 5rem;
}

.topic_header {
    border-bottom: 1px solid #dcddf5;
    padding: 0.9090909091rem 3rem;
    margin-bottom: 0;
    position: fixed;
    width: 75%;
    top: 0;
    height: 10vh;
    background: #fff;
}

.topic_header .title {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.topic-not-empty {
    margin-top: 10vh;
}

.table-responsive {
    overflow-y: auto;
    min-height: 73.4vh;
}

.table-responsive .contents {
    text-align: left;
    border-collapse: collapse;
    border: 1px solid #dcddf5;
    width: 100%;
}

.table-responsive .contents thead {
    background: #dcddf5;
}

.table-responsive .contents thead th {
    font-weight: 600;
}

.table-responsive .contents td,
.table-responsive .contents th {
    border-bottom: 1px solid #dcddf5;
    padding: 0.6rem;
}

.table-responsive .contents .content {
    padding: 0.6rem;
}

.table-responsive .contents .content:hover {
    background-color: #f7f7f7;
}

.table-responsive .content-link {
    display: block;
}

.table-responsive .content-actions {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 0.6rem;
}

.table-responsive .content-actions button {
    height: 2.5rem;
    font-size: 1rem;
}

@media (max-width: 768px) {
    .topic_header {
        position: static;
        padding: 1rem;
        height: auto;
        border-bottom: none;
        width: 100%;
    }

    .topic-not-empty {
        margin-top: 0;
    }
}
</style>