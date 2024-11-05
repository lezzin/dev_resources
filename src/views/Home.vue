<template>
    <div class="padding-container">
        <section>
            <figure class="home-image">
                <img src="../assets/img/einstein.webp" alt="Albert Einstein utilizando um computador - IA" />
                <figcaption>Imagem gerada por inteligência artificial</figcaption>
            </figure>

            <div class="home-content">
                <h2 class="text-display">
                    Olá, usuário! Bem-vindo ao site de ferramentas para desenvolvedores.<br>
                    Aqui você encontrará diversos materiais e links úteis para estudos e desenvolvimento de
                    projetos.
                </h2>
            </div>

            <a href="https://lezzin.github.io" target="_blank" class="author-link link">
                <i class="fab fa-github"></i> Criado por Leandro Adrian da Silva
            </a>
        </section>
    </div>
</template>

<style scoped>
.text-display {
    color: #23287c;
    font-size: 3.4rem;
    font-weight: 300;
}

.home-image {
    max-width: 100%;
    margin-bottom: 1.8rem;
}

.home-image img {
    border-radius: 1rem;
    object-position: center;
}

.home-image figcaption {
    font-size: 1.4rem;
    color: #666;
}

.author-link {
    display: block;
    gap: 0.3rem;
    width: 100%;
    font-size: 1.2rem;
    margin-top: 3rem;
    font-weight: 500;
}
</style>