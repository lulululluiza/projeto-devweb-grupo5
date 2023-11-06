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
