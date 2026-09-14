async function getData(dominio, id) {
    const url = `https://pokeapi.co/api/v2/${dominio}/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

function getDescription(flavor_text_entries) {
    for (const flavor of flavor_text_entries) {
        if (flavor.language !== undefined && flavor.language.name === "en") {
            return flavor.flavor_text
        }
    }

}

function getGenera(genera) {
    for (const gen of genera) {
        if (gen.language !== undefined && gen.language.name === "en") {
            return gen.genus
        }
    }

}

function getTypes(types) {
    return types
}

async function getPokemon(pokemonName) {
    const pokemon = await getData("pokemon", pokemonName)

    if (pokemon === undefined || pokemon === null) {
        return null;
    }

    let species = await getData("pokemon-species", pokemon.id)

    if (species === undefined || species === null) {
        return null;
    }

    let result = {
        id: pokemon.id,
        name: pokemon.name,
        description: getDescription(species.flavor_text_entries).replace("\f", " "),
        cry: pokemon.cries.latest,
        types: pokemon.types,
        sprite: pokemon.sprites.front_default,
        genera: getGenera(species.genera),
        weight: pokemon.weight / 10 + " kg",
        height: pokemon.height / 10 + " m",
    }
    return result
}

const numpoke = document.getElementById("pokenumber")
const namepoke = document.getElementById("name")
const genpoke = document.getElementById("genera")
const spritepoke = document.getElementById("sprites")
const crypoke = document.getElementById("cry")
const type1poke = document.getElementById("type1")
const type2poke = document.getElementById("type2")
const weightpoke = document.getElementById("weight")
const heightpoke = document.getElementById("height")
const descpoke = document.getElementById("description")

const defaultPokemon = {
    id: "000",
    name: "MissingNo.",
    genera: "??? pokemon",
    sprite: "assets/misigno.png",
    cry: "assets/MissingNo.mp3",
    types: [
        { type: { name: "???" } },
        { type: { name: "???" } },
    ],
    weight: "9.5 kg",
    height: "0.9 m",
    description: `MissingNO is a programming quirk, and not a real part of the game. When you get this, your game can perform strangely,
and the graphics will often become scrambled.The MissingNO Pokémon is most often found after you perform the Fight Safari Zone Pokémon trick.`,
}

function resetPokemon(pokemon) {
    numpoke.textContent = pokemon.id
    namepoke.textContent = pokemon.name
    genpoke.textContent = pokemon.genera
    spritepoke.src = pokemon.sprite
    crypoke.src = pokemon.cry

    type1poke.textContent = pokemon.types[0].type.name
    type1poke.className = `type ${pokemon.types[0].type.name}`

    if (pokemon.types[1] !== undefined) {
        type2poke.style.display = "inline-block";
        type2poke.textContent = pokemon.types[1].type.name
        type2poke.className = `type ${pokemon.types[1].type.name}`
    } else {
        type2poke.style.display = "none";
    }
    weightpoke.textContent = pokemon.weight
    heightpoke.textContent = pokemon.height
    descpoke.textContent = pokemon.description
}

resetPokemon(defaultPokemon)

const button = document.querySelector('.sound-btn');
const audio = document.getElementById('cry');

button.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
    audio.volume = 0.4;
});

const sbutton = document.getElementById("searchbtn")

async function search() {
    const query = document.getElementById("query")
    console.log(query.value)

    const ditto = await getPokemon(query.value)

    if (ditto === null) {
        errordiv.style.display = "block";
        resetPokemon(defaultPokemon)
        return

    } else {
        errordiv.style.display = "none";
    }

    resetPokemon(ditto)
};

sbutton.addEventListener("click", search);

const soundBtn = document.getElementById(".sound-btn");
//reemplazar por CSS ⬇️
soundBtn.addEventListener("mouseenter", () => {
    soundBtn.src = "assets/pokecry-hover.png";
});

soundBtn.addEventListener("mouseleave", () => {
    soundBtn.src = "assets/pokecry.png";
});

// id="pokenumber">
// id="name">
// id="flavorname">

// name description cry tipos sprite  https://pokeapi.co/api/v2/pokemon-species/132/
// species.flavor_text_entries[] language.name = "en"
