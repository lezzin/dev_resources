<script setup>
import { QBtn, QCard, QCardActions, QCardSection, QDialog, QIcon, QInnerLoading, QInput, QItem, QItemLabel, QItemSection, QList, QSeparator, QSpinnerGears, QTooltip, useQuasar } from 'quasar';
import { ref, reactive, watch, computed } from 'vue';

import { useContent } from '../composables/useContent';
import { validateSearch } from '../utils/validations';
import { notifyUser } from '../utils/notification';
import { SEARCH_MIN_LENGTH } from '../utils/variables';

const $q = useQuasar();
const contentComposable = useContent();

const searchText = ref("");
const searchedLinks = reactive({ data: [] });
const isShowingSearchCard = ref(false);
const isLoadingResults = ref(false);
const isNoResults = ref(false);

const feedbackIcon = computed(() => (isNoResults.value ? 'search_off' : 'search'));
const feedbackColor = computed(() => ($q.dark.isActive ? 'grey-4' : 'dark'));
const feedbackMessage = computed(() => (
    isNoResults.value ?
        'Nenhum resultado encontrado.' :
        `Digite pelo menos ${SEARCH_MIN_LENGTH} caracteres para começar a pesquisar...`
));

const openSearchCard = () => {
    isShowingSearchCard.value = true;
};

const closeSearchCard = () => {
    isShowingSearchCard.value = false;
    searchedLinks.data = {};
    searchText.value = "";
};

const clearSearchCard = () => {
    searchedLinks.data = {};
};

const searchLinks = async () => {
    isNoResults.value = false;

    if (!searchText.value || searchText.value.trim().length < SEARCH_MIN_LENGTH) return;

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

        <QDialog v-model="isShowingSearchCard" backdrop-filter="blur(4px)" @hide="closeSearchCard">
            <QCard bordered class="search-card fixed-center">
                <QInnerLoading :showing="isLoadingResults" class="z-top">
                    <QSpinnerGears size="50px" color="primary" />
                </QInnerLoading>

                <QCardSection>
                    <QInput clearable autofocus filled dense v-model="searchText" debounce="500"
                        placeholder="Pesquisar por link" :rules="[validateSearch]" @clear="clearSearchCard">
                        <template v-slot:prepend>
                            <QIcon name="search" />
                        </template>
                    </QInput>

                    <QList class="search-list">
                        <template v-if="searchedLinks.data.length">
                            <QItem v-for="(content, index) in searchedLinks.data" :key="index" :href="content.link"
                                target="_blank" class="q-pa-sm" clickable v-ripple>
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

                <QSeparator />

                <QCardActions align="center">
                    <QBtn flat icon="mail_outline" size="sm" label="Sugerir um link"
                        href="https://lezzin.github.io#contact-section" target="_blank" />
                </QCardActions>
            </QCard>
        </QDialog>
    </div>
</template>

<style scoped lang="scss">
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
</style>
