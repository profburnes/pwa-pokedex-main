const container = document.querySelector(".row");

async function fetchPokemons(limit = 20) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();

    const pokemonList = data.results;

    for (const pokemon of pokemonList) {
      const pokemonData = await fetchPokemonData(pokemon.url);
      showPokemon(pokemonData);
    }
  } catch (error) {
    console.error("Erro ao buscar Pokémons:", error);
  }
}

async function fetchPokemonData(url) {
  const response = await fetch(url);
  return await response.json();
}

function showPokemon(pokemon) {
  const div = document.createElement("div");
  div.className = "pokemon";

  div.innerHTML = `<div class="card">
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>${pokemon.name}</p>
    </div>
  `;

  container.appendChild(div);
}

fetchPokemons();