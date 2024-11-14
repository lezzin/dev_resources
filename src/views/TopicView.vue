<script setup>
import { doc, onSnapshot } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router'
import { watch, onMounted, reactive, ref, markRaw } from 'vue';
import { storeToRefs } from 'pinia';
import { QPage, useQuasar, QDialog } from 'quasar';

import errorMessages from '../utils/errorMessages';
import { notifyUser } from '../utils/notification';
import { PAGE_TITLE } from '../utils/variables';
import { db } from '../utils/firebase';
import { useAuth } from '../stores/useAuth';
import { useTopic } from '../composables/useTopic';
import { useContent } from '../composables/useContent';
import { useModal } from '../composables/useModal';

import EditTopic from '../components/dialog/EditTopic.vue';
import AddContent from '../components/dialog/AddContent.vue';
import EditContent from '../components/dialog/EditContent.vue';
import TableTopic from '../components/table/TableTopic.vue';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const modal = useModal();

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
        if (error.code === "topicNotFound") {
            router.push('/');
        }

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

const openEditTopicModal = () => {
    modal.component.value = markRaw(EditTopic);
    modal.show.value = true;
}

const openAddContentModal = () => {
    modal.component.value = markRaw(AddContent);
    modal.show.value = true;
}

const editingContentId = ref('');
const openEditContentModal = async (contentId) => {
    modal.component.value = markRaw(EditContent);
    modal.show.value = true;
    editingContentId.value = contentId;
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
            <TableTopic :columns="columns.data" :topic="topicData" @deleteTopic="deleteTopic"
                @deleteContent="deleteContent" @openAddContentModal="openAddContentModal"
                @openEditContentModal="openEditContentModal" @openEditTopicModal="openEditTopicModal" />
        </section>
    </QPage>

    <Teleport to="#dialog">
        <QDialog v-model="modal.show.value" backdrop-filter="blur(4px)">
            <component :is="modal.component.value" :contentId="editingContentId" @close="modal.hideModal" />
        </QDialog>
    </Teleport>
</template>
