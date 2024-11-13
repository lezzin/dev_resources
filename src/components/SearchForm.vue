<script setup>
import { QBtn, QCard, QCardSection, QIcon, QInput, QItem, QItemLabel, QItemSection, QList, QTooltip, useQuasar } from 'quasar';
import debounce from 'lodash.debounce';
import { ref, reactive, watch } from 'vue';
import { useContent } from '../composables/useContent';
import { validateSearch } from '../utils/validations';
import { onClickOutside } from '@vueuse/core';

const $q = useQuasar();
const contentComposable = useContent();

const searchCard = ref(null);
const search = ref("");
const links = reactive({ data: [] });
const isShowingList = ref(false);
const loading = ref(false);
const noResults = ref(false);

const closeSearchCard = () => {
    isShowingList.value = false;
    search.value = '';
}

const searchLinks = async () => {
    loading.value = true;
    noResults.value = false;

    try {
        links.data = await contentComposable.searchContent(search.value);
        noResults.value = links.data.length === 0;
    } catch (error) {
        console.error('Search failed', error);
    } finally {
        loading.value = false;
    }
}

watch(search, debounce(async () => {
    if (search.value.trim().length > 3) {
        await searchLinks();
    } else {
        links.data = [];
        noResults.value = false;
    }
}, 500));

onClickOutside(searchCard, closeSearchCard);
</script>

<template>
    <div class="relative-position">
        <QBtn round unelevated flat color="white" icon="search" @click="isShowingList = true">
            <QTooltip>Pesquisar por link</QTooltip>
        </QBtn>

        <Transition>
            <div v-if="isShowingList" class="fixed-overlay fixed-full">
                <QCard bordered flat class="shadow-10 search-card fixed-center" ref="searchCard">
                    <QCardSection>
                        <QInput filled dense hide-bottom-space v-model="search" placeholder="Pesquisar por conteúdo"
                            :loading="loading" :rules="[validateSearch]">
                            <template v-slot:prepend>
                                <QIcon v-if="!search" name="search" />
                                <QIcon v-else name="clear" class="cursor-pointer" @click="closeSearchCard" />
                            </template>
                        </QInput>

                        <QList class="q-mt-sm search-list">
                            <template v-if="!loading && links.data.length">
                                <QItem v-ripple clickable v-for="(content, index) in links.data" :key="index"
                                    :href="content.link" target="_blank">
                                    <QItemSection no-wrap>
                                        <QItemLabel :class="$q.dark.isActive ? 'text-white' : 'text-dark'">
                                            {{ content.title }}
                                        </QItemLabel>
                                        <QItemLabel caption class="ellipsis">{{ content.description }}</QItemLabel>
                                    </QItemSection>
                                </QItem>
                            </template>

                            <template v-if="!loading && noResults && search.trim()">
                                <QItem>
                                    <QItemSection>
                                        <span :class="`${$q.dark.isActive ? 'text-grey' : 'text-dark'} text-center`">
                                            Nenhum resultado para a pesquisa.
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
.search-card {
    width: 90%;
    max-width: 500px;
    min-height: 30vh;
}

.search-list {
    max-height: 300px;
    overflow-x: auto;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.fixed-overlay {
    background-color: rgba($grey-10, .6);
    backdrop-filter: blur(2px);
}
</style>
