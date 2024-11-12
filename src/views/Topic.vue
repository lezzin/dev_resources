<script setup>
import errorMessages from '../utils/errorMessages';
import { db } from '../firebase';

import { doc, onSnapshot } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';

import { useAuth } from '../stores/useAuth';
import { QTable, QTh, QTd, QTr, QBtn, QBtnGroup, QTooltip, QImg, QIcon, QSpace, useQuasar } from 'quasar';
import { useTopic } from '../composables/useTopic';
import { useContent } from '../composables/useContent';

const router = useRouter();
const route = useRoute();

const topicComposable = useTopic();
const contentComposable = useContent();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const id = ref('');
const title = ref('');
const contents = ref([]);
const isUserCreator = ref(false);

const $q = useQuasar();

const columns = reactive([
    { name: 'website', label: 'Website', align: 'left', field: 'title' },
    { name: 'description', label: 'Descrição', align: 'left', field: 'description' },
]);

const loadTopic = async (topicId) => {
    if (user.value && !columns.find(col => col.name === 'actions')) {
        columns.push({ name: 'actions', label: 'Ações', align: 'center', field: 'actions' });
    }

    try {
        const topicData = await topicComposable.loadTopic(topicId);

        id.value = topicId;
        title.value = topicData.title;
        contents.value = topicData.contents;
        isUserCreator.value = user.value?.uid === topicData.created_by;
        document.title = `Ferramentas para Devs | ${title.value}`;
    } catch (error) {
        handleError(error.code);
    }
};

const deleteTopic = async (topicId) => {
    if (!confirm('Tem certeza que deseja deletar esse tópico? Todo o conteúdo será perdido.')) return;

    try {
        await topicComposable.deleteTopic(topicId);

        $q.notify({
            message: 'Tópico removido com sucesso',
            color: 'green'
        });

        router.push('/');
    } catch (error) {
        handleError('deleteTopicError');
    }
};

const deleteContent = async (contentId) => {
    if (!confirm('Tem certeza que deseja deletar esse conteúdo?')) return;

    try {
        const topicId = route.params.id;
        contentComposable.deleteContent(contentId, topicId);

        $q.notify({
            message: 'Conteúdo removido com sucesso',
            color: 'green'
        });
    } catch (error) {
        handleError(error.code);
    }
};

const handleError = (errorMessage) => {
    $q.notify({
        message: errorMessages[errorMessage] || errorMessages.generalError,
        color: 'red'
    });
};

onMounted(() => {
    const topicId = route.params.id;
    loadTopic(topicId);

    onSnapshot(doc(db, 'topics', topicId), (docSnap) => {
        if (docSnap.exists()) {
            const topicData = docSnap.data();
            title.value = topicData.title;
            contents.value = topicData.contents;
        }
    });
});

watch(() => route.params.id, (newId) => {
    loadTopic(newId);
})

watch(user, (newUser) => {
    if (!newUser) {
        isUserCreator.value = false;
    }
})
</script>

<template>
    <section>
        <div class="table-responsive">
            <QTable :rows="contents" :columns="columns" flat row-key="id" rows-per-page-label="Linhas por página:"
                :rows-per-page-options="[9, 15, 25, 50, 0]">
                <template v-slot:top>
                    <div class="flex justify-between items-center full-width">
                        <h2 class="text-h4 text-weight-bold q-ma-none">{{ title }}</h2>

                        <QBtnGroup rounded v-if="isUserCreator">
                            <QBtn unelevated outline color="primary" :to="`/topic/${id}/edit`" icon="edit">
                                <QTooltip>Editar tópico</QTooltip>
                            </QBtn>

                            <QBtn unelevated color="red" @click="deleteTopic(id)" icon="delete">
                                <QTooltip>Remover tópico</QTooltip>
                            </QBtn>

                            <QBtn unelevated color="primary" :to="`/topic/${id}/content-form`" icon="add">
                                <QTooltip>Adicionar novo conteúdo</QTooltip>
                            </QBtn>
                        </QBtnGroup>
                    </div>
                </template>

                <template v-slot:header="props">
                    <QTr :props="props">
                        <QTh v-for="col in props.cols" :key="col.name" :props="props">
                            <span class="text-weight-bold">
                                {{ col.label }}
                            </span>
                        </QTh>
                    </QTr>
                </template>

                <template v-slot:body="props">
                    <QTr :props="props">
                        <QTd>
                            <a target="_blank" :href="props.row.link" class="text-primary">
                                {{ props.row.title }}
                            </a>
                        </QTd>
                        <QTd>{{ props.row.description }}</QTd>
                        <QTd v-if="user">
                            <QBtnGroup>
                                <QBtn unelevated outline size="sm" color="primary"
                                    :to="`/topic/${$route.params.id}/content/${props.row.id}/edit`" v-if="isUserCreator"
                                    icon="edit">
                                    <QTooltip>Editar conteúdo</QTooltip>
                                </QBtn>

                                <QBtn unelevated outline size="sm" color="red" v-if="isUserCreator"
                                    @click="deleteContent(props.row.id)" icon="delete">
                                    <QTooltip>Remover conteúdo</QTooltip>
                                </QBtn>
                            </QBtnGroup>
                        </QTd>
                    </QTr>
                </template>

                <template v-slot:no-data>
                    <QImg src="/src/assets/img/content_empty_lg.webp" />
                </template>
            </QTable>
        </div>
    </section>
</template>
