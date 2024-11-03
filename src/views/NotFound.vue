<template>
    <section>
        <div class="padding-container centered-container">
            <img src="../assets/img/not_found_lg.gif" alt="Imagem de um robô e um computador com o número 404 na tela"
                width="900" height="454" class="lg">
            <img src="../assets/img/not_found_sm.gif" alt="Imagem de um robô e um computador com o número 404 na tela"
                width="568" height="454" class="sm">
            <RouterLink class="link" to="/">Voltar para o início</RouterLink>
        </div>
    </section>
</template>

<style scoped>
.centered-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1rem;
}
</style>