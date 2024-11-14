<script setup>
import { QBtn, QCard, QCardActions, QCardSection, QDialog, QIcon, QInnerLoading, QInput, QItem, QItemLabel, QItemSection, QList, QSeparator, QSpinnerGears, QTooltip, useQuasar } from 'quasar';
import { ref, reactive, computed, watch } from 'vue';
import { useContent } from '../../composables/useContent';
import { validateSearch } from '../../utils/validations';
import { notifyUser } from '../../utils/notification';
import { SEARCH_MIN_LENGTH } from '../../utils/variables';

const $q = useQuasar();
const contentComposable = useContent();

const MAX_STORAGE_ITEMS = 6;
const DEBOUNCE_MILLISECONDS = 500;
const STORAGE_KEY = "recent_searched_links";

const searchQuery = ref("");
const isSearchCardVisible = ref(false);
const isSearching = ref(false);
const hasNoResults = ref(false);
const hasRecentSearches = ref(false);
const recentSearchResults = reactive({ data: [] });

const feedbackIcon = computed(() => (hasNoResults.value ? 'search_off' : 'search'));
const feedbackColor = computed(() => ($q.dark.isActive ? 'grey-4' : 'dark'));
const feedbackMessage = computed(() => (
    hasNoResults.value ? 'Nenhum resultado encontrado.' : `Digite pelo menos ${SEARCH_MIN_LENGTH} caracteres para começar a pesquisar...`
));

const openSearchCard = () => {
    isSearchCardVisible.value = true;
};

const closeSearchCard = () => {
    isSearchCardVisible.value = false;
    resetSearchState();
};

const resetSearchState = () => {
    recentSearchResults.data = [];
    searchQuery.value = "";
    hasRecentSearches.value = false;
};

const saveSearchResultsToStorage = (newResults) => {
    const existingResults = getRecentSearchesFromStorage();
    const uniqueResults = [...newResults, ...existingResults]
        .filter((result, index, self) => self.findIndex(r => r.id === result.id) === index)
        .slice(0, MAX_STORAGE_ITEMS);

    const newResultsJSON = JSON.stringify(uniqueResults);
    $q.localStorage.set(STORAGE_KEY, newResultsJSON);
};

const clearRecentSearchesFromStorage = () => {
    $q.localStorage.removeItem(STORAGE_KEY);
    resetSearchState();
};

const getRecentSearchesFromStorage = () => {
    const storedItems = JSON.parse($q.localStorage.getItem(STORAGE_KEY)) ?? [];
    hasRecentSearches.value = storedItems.length > 0;
    return storedItems;
};

const searchForLinks = async () => {
    hasNoResults.value = false;
    if (!searchQuery.value || searchQuery.value.trim().length < SEARCH_MIN_LENGTH) return;
    isSearching.value = true;

    try {
        const searchResults = await contentComposable.searchContent(searchQuery.value);
        hasRecentSearches.value = false;

        if (searchResults.length > 0) {
            saveSearchResultsToStorage(searchResults);
            recentSearchResults.data = searchResults;
            hasNoResults.value = false;
            return;
        }

        recentSearchResults.data = [];
        hasNoResults.value = true;
    } catch (error) {
        console.error(error);
        notifyUser('Erro ao pesquisar por conteúdos', 'error');
    } finally {
        isSearching.value = false;
    }
};

watch(isSearchCardVisible, (isVisible) => {
    if (isVisible) {
        recentSearchResults.data = getRecentSearchesFromStorage();
    }
});

watch(searchQuery, (newQuery) => {
    if (!newQuery) {
        recentSearchResults.data = getRecentSearchesFromStorage();
        hasRecentSearches.value = recentSearchResults.data.length > 0;
        return;
    }

    searchForLinks();
    hasRecentSearches.value = false;
});
</script>

<template>
    <div class="relative-position text-dark">
        <QBtn round unelevated flat color="white" icon="search" @click="openSearchCard">
            <QTooltip>Pesquisar por link</QTooltip>
        </QBtn>
    </div>

    <Teleport to="#dialog">
        <QDialog v-model="isSearchCardVisible" backdrop-filter="blur(4px)" @hide="closeSearchCard">
            <QCard bordered class="search-card fixed-center">
                <QInnerLoading :showing="isSearching" class="z-top">
                    <QSpinnerGears size="50px" color="primary" />
                </QInnerLoading>

                <QCardSection>
                    <QInput clearable autofocus filled dense v-model="searchQuery" :debounce="DEBOUNCE_MILLISECONDS"
                        placeholder="Pesquisar por link" :rules="[validateSearch]" @clear="resetSearchState">
                        <template v-slot:prepend>
                            <QIcon name="search" />
                        </template>
                    </QInput>

                    <QList class="search-list">
                        <template v-if="hasRecentSearches">
                            <QItemSection class="text-subtitle2 text-grey">
                                <div class="row justify-between q-px-sm items-center q-gutter-sm">
                                    <span>Pesquisas recentes</span>
                                    <QBtn flat size="sm" color="blue" label="Remover"
                                        @click="clearRecentSearchesFromStorage">
                                    </QBtn>
                                </div>
                            </QItemSection>
                        </template>

                        <template v-if="recentSearchResults.data.length">
                            <QItem v-for="(content, index) in recentSearchResults.data" :key="index"
                                :href="content.link" target="_blank" class="q-pa-sm" clickable v-ripple>
                                <QItemSection avatar>
                                    <QIcon name="open_in_new" color="primary" />
                                </QItemSection>
                                <QItemSection no-wrap>
                                    <QItemLabel lines="1">
                                        <span v-html="content.title"></span>
                                    </QItemLabel>
                                    <QItemLabel caption lines="1">
                                        <span v-html="content.description"></span>
                                    </QItemLabel>
                                </QItemSection>
                            </QItem>
                        </template>

                        <template v-else-if="!isSearching">
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

                <QSeparator />

                <QCardActions>
                    <QBtn flat icon="mail_outline" size="sm" label="Sugerir um link"
                        href="https://lezzin.github.io#contact-section" target="_blank" />
                </QCardActions>
            </QCard>
        </QDialog>
    </Teleport>
</template>

<style scoped lang="scss">
.search-card {
    width: 90%;
    max-width: 500px;
}

.search-list {
    height: 300px;
    overflow-y: auto;
}
</style>
