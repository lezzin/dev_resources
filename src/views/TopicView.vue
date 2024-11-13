<script setup>
import { doc, onSnapshot } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router'
import { watch, onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { QTable, QTh, QTd, QTr, QBtn, QBtnGroup, QTooltip, QPage, useQuasar } from 'quasar';

import errorMessages from '../utils/errorMessages';
import { notifyUser } from '../utils/notification';
import { db } from '../utils/firebase';
import { useAuth } from '../stores/useAuth';
import { useTopic } from '../composables/useTopic';
import { useContent } from '../composables/useContent';
import { PAGE_TITLE } from '../utils/variables';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const topicComposable = useTopic();
const contentComposable = useContent();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const topicData = reactive({
    id: '',
    title: '',
    contents: [],
    created_by: '',
});

const columns = reactive({
    data: [
        { name: 'website', label: 'Website', align: 'left', field: 'title' },
        { name: 'description', label: 'Descrição', align: 'left', field: 'description' },
    ]
});

const isUserCreated = (createdBy) => {
    return user.value?.uid === createdBy;
};

const updateActionColumn = () => {
    const actionIndex = columns.data.findIndex(col => col.name === 'actions');
    if (actionIndex !== -1) {
        columns.data.splice(actionIndex, 1);
    }

    if (isUserCreated(topicData.created_by)) {
        columns.data.push({ name: 'actions', label: 'Ações', align: 'left', field: 'actions' });
    }
};

const loadTopic = async (topicId) => {
    $q.loading.show();

    try {
        const topic = await topicComposable.loadTopic(topicId);

        topicData.id = topicId;
        topicData.title = topic.title;
        topicData.contents = topic.contents;
        topicData.created_by = topic.created_by;
        document.title = `${PAGE_TITLE} ${topicData.title}`;

        updateActionColumn();

        const docRef = doc(db, 'topics', topicId);
        onSnapshot(docRef, (docSnap) => {
            if (!docSnap.exists()) return;

            const { title, contents, created_by } = docSnap.data();
            topicData.title = title;
            topicData.contents = contents;
            topicData.created_by = created_by;

            updateActionColumn();
        });
    } catch (error) {
        handleError(error);
    } finally {
        $q.loading.hide();
    }
};

const deleteTopic = async (topicId) => {
    if (!confirm('Tem certeza que deseja deletar esse tópico? Todo o conteúdo será perdido.')) return;

    try {
        await topicComposable.deleteTopic(topicId);
        notifyUser('Tópico removido com sucesso', 'success');
        router.push('/');
    } catch (error) {
        handleError(error);
    }
};

const deleteContent = async (contentId) => {
    if (!confirm('Tem certeza que deseja deletar esse conteúdo?')) return;

    try {
        const topicId = route.params.id;
        contentComposable.deleteContent(contentId, topicId);
        notifyUser('Conteúdo removido com sucesso', 'success');
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    notifyUser(errorMessages[error.code] || errorMessages.generalError(error), 'error');
};

onMounted(() => {
    const topicId = route.params.id;
    loadTopic(topicId);
});

watch(() => route.params.id, (newId) => {
    loadTopic(newId);
});

watch(user, (newUser) => {
    if (!newUser) updateActionColumn();
});
</script>

<template>
    <QPage padding>
        <section class="q-mx-auto q-pa-md" style="max-width: 1080px;">
            <div class="table-responsive">
                <QTable :rows="topicData.contents" :columns="columns.data" flat row-key="id"
                    rows-per-page-label="Linhas por página:" class="q-pa-md">
                    <template v-slot:top>
                        <div class="flex justify-between items-center full-width q-gutter-md">
                            <h2 :class="`${$q.screen.lt.md ? 'text-h5' : 'text-h4'} text-weight-bold q-ma-none`">
                                {{ topicData.title }}
                            </h2>

                            <QBtnGroup rounded v-if="isUserCreated(topicData.created_by)">
                                <QBtn unelevated outline color="primary" :to="`/topic/${topicData.id}/edit`"
                                    icon="edit">
                                    <QTooltip>Editar tópico</QTooltip>
                                </QBtn>

                                <QBtn unelevated color="red" @click="deleteTopic(topicData.id)" icon="delete">
                                    <QTooltip>Remover tópico</QTooltip>
                                </QBtn>

                                <QBtn unelevated color="primary" :to="`/topic/${topicData.id}/content-form`" icon="add">
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
                                <a target="_blank" :href="props.row.link"
                                    :class="`${$q.dark.isActive ? 'text-white' : 'text-primary'}`">
                                    {{ props.row.title }}
                                </a>
                            </QTd>
                            <QTd>{{ props.row.description }}</QTd>
                            <QTd v-if="isUserCreated(props.row.created_by)">
                                <QBtnGroup>
                                    <QBtn unelevated outline size="sm" color="primary"
                                        :to="`/topic/${$route.params.id}/content/${props.row.id}/edit`" icon="edit">
                                        <QTooltip>Editar conteúdo</QTooltip>
                                    </QBtn>

                                    <QBtn unelevated outline size="sm" color="red" @click="deleteContent(props.row.id)"
                                        icon="delete">
                                        <QTooltip>Remover conteúdo</QTooltip>
                                    </QBtn>
                                </QBtnGroup>
                            </QTd>
                        </QTr>
                    </template>

                    <template v-slot:no-data>
                        <div class="full-width row flex-center q-gutter-sm">
                            <q-icon size="1rem" name="sentiment_dissatisfied" />
                            <span>
                                Nenhum conteúdo disponível por enquanto. Que tal explorar outros tópicos enquanto isso?
                            </span>
                        </div>
                    </template>
                </QTable>
            </div>
        </section>
    </QPage>
</template>
