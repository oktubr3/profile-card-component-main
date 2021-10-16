document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 899);
    fetchData(random);
})

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat,
            experience: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat

        }

        pintarCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (pokemon) => {
    console.log (pokemon);
    const main = document.querySelector('.flex');
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name.toUpperCase()} <span> ${pokemon.hp} </span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.experience + ' Exp';
    clone.querySelector('.card-footer-social h3').textContent = pokemon.ataque + ' K';
    clone.querySelector('.card-footer-likes h3').textContent = pokemon.especial + ' K';
    clone.querySelector('.card-footer-photos h3').textContent = pokemon.defensa + ' K';

    fragment.appendChild(clone);
    main.appendChild(fragment);
}