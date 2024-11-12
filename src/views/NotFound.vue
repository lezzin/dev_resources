<template>
    <section>
        <div class="column justify-center items-center">
            <img src="../assets/img/not_found_lg.gif" alt="Imagem de um robô e um computador com o número 404 na tela"
                width="900" height="454" class="lg">
            <img src="../assets/img/not_found_sm.gif" alt="Imagem de um robô e um computador com o número 404 na tela"
                width="568" height="454" class="sm">
            <RouterLink class="link" to="/">Voltar para o início</RouterLink>
        </div>
    </section>
</template>

<style scoped>
.lg {
    display: initial;
}

.sm {
    display: none;
}

@media(max-width: 768px) {
    .lg {
        display: none;
    }

    .sm {
        display: initial;
    }
}
</style>