<script setup>
import { QBtn, QCard, QCardSection, QIcon, QInnerLoading, QInput, QItem, QItemLabel, QItemSection, QList, QSpinnerGears, QTooltip, useQuasar } from 'quasar';
import { ref, reactive, watch, computed } from 'vue';

import { useContent } from '../composables/useContent';
import { validateSearch } from '../utils/validations';
import { notifyUser } from '../utils/notification';

const $q = useQuasar();
const contentComposable = useContent();

const searchInputRef = ref(null);

const searchText = ref("");
const searchedLinks = reactive({ data: [] });
const isShowingSearchCard = ref(false);
const isLoadingResults = ref(false);
const isNoResults = ref(false);

const feedbackIcon = computed(() => {
    return isNoResults.value ? 'search_off' : 'search';
});

const feedbackColor = computed(() => {
    return $q.dark.isActive ? 'grey-4' : 'dark';
});

const feedbackMessage = computed(() => {
    return isNoResults.value ? 'Nenhum resultado encontrado.' : 'Digite pelo menos 4 caracteres para começar a pesquisar...';
});

const closeSearchCard = () => {
    isShowingSearchCard.value = false;
    searchedLinks.data = {};
    searchText.value = '';
};

const openSearchCard = () => {
    isShowingSearchCard.value = true;
};

const searchLinks = async () => {
    isNoResults.value = false;

    if (!searchText.value || searchText.value.trim().length < 4) return;

    isLoadingResults.value = true;

    try {
        const results = await contentComposable.searchContent(searchText.value);
        isNoResults.value = results.length === 0;
        searchedLinks.data = results;
    } catch (error) {
        console.error(error);
        notifyUser('Erro ao pesquisar por conteúdos', 'error');
    } finally {
        isLoadingResults.value = false;
    }
};

watch(searchText, searchLinks);
</script>

<template>
    <div class="relative-position text-dark">
        <QBtn round unelevated flat color="white" icon="search" @click="openSearchCard">
            <QTooltip>Pesquisar por link</QTooltip>
        </QBtn>

        <Transition name="fade">
            <div v-if="isShowingSearchCard" class="fixed-overlay fixed-full z-top" @click.self="closeSearchCard">
                <QCard bordered class="search-card fixed-center">
                    <QInnerLoading :showing="isLoadingResults" class="z-top">
                        <QSpinnerGears size="50px" color="primary" />
                    </QInnerLoading>

                    <QCardSection>
                        <QInput clearable autofocus filled dense v-model="searchText" debounce="500"
                            ref="searchInputRef" placeholder="Pesquisar por conteúdo" :rules="[validateSearch]">
                            <template v-slot:prepend>
                                <QIcon name="search" />
                            </template>
                        </QInput>

                        <QList class="search-list">
                            <template v-if="searchedLinks.data.length">
                                <QItem v-for="(content, index) in searchedLinks.data" :key="index" :href="content.link"
                                    target="_blank" class="q-pa-sm" clickable v-ripple>
                                    <QItemSection no-wrap>
                                        <QItemLabel lines="1">
                                            {{ content.title }}
                                        </QItemLabel>
                                        <QItemLabel caption class="ellipsis text-grey" lines="2">
                                            {{ content.description }}
                                        </QItemLabel>
                                    </QItemSection>
                                    <QItemSection avatar>
                                        <QIcon name="open_in_new" color="primary" />
                                    </QItemSection>
                                </QItem>
                            </template>

                            <template v-else-if="!isLoadingResults">
                                <QItem>
                                    <QItemSection class="items-center text-center q-pa-sm">
                                        <QIcon :name="feedbackIcon" :color="feedbackColor" size="md" class="q-mb-sm" />
                                        <span :class="feedbackColor">
                                            {{ feedbackMessage }}
                                        </span>
                                    </QItemSection>
                                </QItem>
                            </template>
                        </QList>
                    </QCardSection>
                </QCard>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.fixed-overlay {
    background-color: rgba($grey-10, 0.6);
    backdrop-filter: blur(2px);
}

.search-card {
    width: 90%;
    max-width: 500px;
    min-height: 27.5vh;

    @media(max-width: 768px) {
        min-height: 30vh;
    }
}

.search-list {
    max-height: 300px;
    overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
