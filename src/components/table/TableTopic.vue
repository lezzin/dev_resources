<script setup>
import { storeToRefs } from 'pinia';
import { QTable, QTh, QTd, QTr, QBtn, QBtnGroup, QTooltip, QIcon, useQuasar } from 'quasar';
import { useAuth } from '../../stores/useAuth';
import { computed } from 'vue';

const $q = useQuasar();

const authUser = useAuth();
const { user } = storeToRefs(authUser);

const props = defineProps({
    columns: {
        type: Array,
        required: true,
        default: () => [],
    },
    topic: {
        type: Object,
        required: true,
        default: () => ({ title: '', contents: [] }),
    },
})

const isUserCreated = (createdBy) => {
    return user.value?.uid === createdBy;
};

const computedColumns = computed(() => {
    const baseColumns = [...props.columns];
    if (isUserCreated(props.topic.created_by)) {
        baseColumns.push({ name: 'actions', label: 'Ações', align: 'left', field: 'actions' });
    }
    return baseColumns;
});

</script>

<template>
    <div class="table-responsive">
        <QTable :rows="props.topic.contents" :columns="computedColumns" flat row-key="id"
            rows-per-page-label="Linhas por página:" class="q-pa-md" :rows-per-page-options="[10, 15, 20, 25, 50, 0]">

            <template v-slot:top>
                <div class="flex justify-between items-center full-width q-gutter-md">
                    <h2 :class="`${$q.screen.lt.md ? 'text-h5' : 'text-h4'} text-weight-bold q-ma-none`">
                        {{ props.topic.title }}
                    </h2>

                    <QBtnGroup rounded v-if="isUserCreated(props.topic.created_by)">
                        <QBtn unelevated outline color="primary" @click="$emit('openEditTopicModal')" icon="edit">
                            <QTooltip>Editar tópico</QTooltip>
                        </QBtn>

                        <QBtn unelevated color="red" @click="$emit('deleteTopic', props.topic.id)" icon="delete">
                            <QTooltip>Remover tópico</QTooltip>
                        </QBtn>

                        <QBtn unelevated color="primary" @click="$emit('openAddContentModal')" icon="add">
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
                                @click="$emit('openEditContentModal', props.row.id)" icon="edit">
                                <QTooltip>Editar conteúdo</QTooltip>
                            </QBtn>

                            <QBtn unelevated outline size="sm" color="red" @click="$emit('deleteContent', props.row.id)"
                                icon="delete">
                                <QTooltip>Remover conteúdo</QTooltip>
                            </QBtn>
                        </QBtnGroup>
                    </QTd>
                </QTr>
            </template>

            <template v-slot:no-data>
                <p class="full-width text-body2 text-center q-mb-none">
                    <QIcon size="1rem" name="sentiment_dissatisfied" />
                    Nenhum conteúdo disponível por enquanto. Que tal explorar outros tópicos enquanto isso?
                </p>
            </template>
        </QTable>
    </div>
</template>