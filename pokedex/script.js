
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonSprite = document.querySelector(".pokemon__sprite");
const form = document.querySelector(".pokedex__form");
const input = document.querySelector(".input__search");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();

        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Carregando";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonSprite.src =
            data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
            "front_default"
            ];
        input.value = "";
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = "Não encontrado";
        pokemonNumber.innerHTML = "";
        pokemonSprite.style.display = "none";
    }
};

const fetchStats = async (pokemon) => {

    const data = await fetchPokemon(pokemon)

    if (data) {
        const stats = `Stats
        \n${data.stats[0].stat.name} - ${data.stats[0].base_stat}
        \n${data.stats[1].stat.name} - ${data.stats[1].base_stat}
        \n${data.stats[2].stat.name} - ${data.stats[2].base_stat}
        \n${data.stats[3].stat.name} - ${data.stats[3].base_stat}
        \n${data.stats[4].stat.name} - ${data.stats[4].base_stat}
        \n${data.stats[5].stat.name} - ${data.stats[5].base_stat}
        `

        alert(stats)
        console.log(stats)
    }
};

pokemonSprite.addEventListener("click", () => {
    fetchStats(searchPokemon)
})


form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener("click", () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
