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
    let species = await getData("pokemon-species", pokemon.id)
    let result = {
        id: pokemon.id,
        name: pokemon.name,
        description: getDescription(species.flavor_text_entries),
        cry: pokemon.cries.latest,
        types: pokemon.types,
        sprite: pokemon.sprites.front_default,
        genera: getGenera(species.genera),
        weight: pokemon.weight,
        height: pokemon.height,
    }

    return result
}

const button = document.querySelector('.sound-btn');
const audio = document.getElementById('cry');

button.addEventListener('click', () => {
    audio.currentTime = 0; // Rewind to start if clicked repeatedly
    audio.play();
    audio.volume = 0.4;
});

const sbutton = document.getElementById("searchbtn")
sbutton.addEventListener("click", async () => {

    const query = document.getElementById("query")
    console.log(query.value)

    const ditto = await getPokemon(query.value)

    const numPoke = document.getElementById("pokenumber")
    numPoke.textContent = ditto.id

    const namePoke = document.getElementById("name")
    namePoke.textContent = ditto.name

    const genPoke = document.getElementById("genera")
    genPoke.textContent = ditto.genera

    const spritePoke = document.getElementById("sprites")
    spritePoke.setAttribute("src", ditto.sprite)

    const cryPoke = document.getElementById("cry")
    cryPoke.setAttribute("src", ditto.cry)

    const type1Poke = document.getElementById("type1")
    type1Poke.textContent = ditto.types[0].type.name
    type1Poke.className = `type ${ditto.types[0].type.name}`

    const type2Poke = document.getElementById("type2")
    if (ditto.types[1] !== undefined) {
        type2Poke.textContent = ditto.types[1].type.name
        type2Poke.className = `type ${ditto.types[1].type.name}`
    }

    const weightPoke = document.getElementById("weight")
    weightPoke.textContent = ditto.weight / 10 + " kg"

    const heightPoke = document.getElementById("height")
    heightPoke.textContent = ditto.height / 10 + " m"

    const descPoke = document.getElementById("description")
    descPoke.textContent = ditto.description.replace("\f", " ")





});

const soundBtn = document.getElementById(".sound-btn");
//reemplazar por CSS ⬇️
soundBtn.addEventListener("mouseenter", () => {
    soundBtn.src = "pokecry-hover.png";
});

soundBtn.addEventListener("mouseleave", () => {
    soundBtn.src = "pokecry.png";
});

// id="pokenumber">
// id="name">
// id="flavorname">

// name description cry tipos sprite  https://pokeapi.co/api/v2/pokemon-species/132/
// species.flavor_text_entries[] language.name = "en"
