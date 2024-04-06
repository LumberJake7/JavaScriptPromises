let fetchedPokemon = [];
let displayedPokemonNames = new Set();

async function catch3() {
  let baseURL = "https://pokeapi.co/api/v2/pokemon";
  let promises = [];
  for (let i = 0; i < 3; ) {
    let randomNum = Math.floor(Math.random() * 1025) + 1;
    if (!displayedPokemonNames.has(randomNum)) {
      promises.push($.getJSON(`${baseURL}/${randomNum}/`));
      i++;
    }
  }
  fetchedPokemon = await Promise.all(promises);
}

async function fetchPokemonDescription(url) {
  let response = await $.getJSON(url);
  let flavorTextEntry = response.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );
  return flavorTextEntry
    ? flavorTextEntry.flavor_text
    : "No Description available.";
}

document
  .getElementById("displayPokemon")
  .addEventListener("click", async function () {
    if (fetchedPokemon.length > 0) {
      let pokemonContainer = document.getElementById("pokemonList");
      if (this.textContent === "Reset") {
        pokemonContainer.innerHTML = "";
        displayedPokemonNames.clear();
        await catch3();
        this.textContent = "Catch a Pokemon!";
        return;
      }
      let uniquePokemon = fetchedPokemon.find(
        (poke) => !displayedPokemonNames.has(poke.name)
      );
      if (uniquePokemon) {
        displayedPokemonNames.add(uniquePokemon.name);
        let description = await fetchPokemonDescription(
          uniquePokemon.species.url
        );

        let card = document.createElement("div");
        card.classList.add("pokemon-card");

        let nameElement = document.createElement("h2");
        nameElement.textContent = uniquePokemon.name;
        card.appendChild(nameElement);

        let img = document.createElement("img");
        img.src = uniquePokemon.sprites.front_default;
        card.appendChild(img);

        let descriptionElement = document.createElement("p");
        descriptionElement.textContent = description;
        card.appendChild(descriptionElement);

        pokemonContainer.appendChild(card);

        if (displayedPokemonNames.size === 3) {
          this.textContent = "Reset";
        }
      } else {
        console.log("All fetched Pokemon are already displayed.");
      }
    } else {
      console.log("No Pokemon data available.");
    }
  });

catch3();
