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

const numMissing = document.getElementById("pokenumber")
const nameMissing = document.getElementById("name")
const genMissing = document.getElementById("genera")
const spriteMissing = document.getElementById("sprites")
const cryMissing = document.getElementById("cry")
const type1Missing = document.getElementById("type1")
const type2Missing = document.getElementById("type2")
const weightMissing = document.getElementById("weight")
const heightMissing = document.getElementById("height")
const descMissing = document.getElementById("description")

const defaultPokemon = {
    id: numMissing.textContent,
    name: nameMissing.textContent,
    genera: genMissing.textContent,
    sprite: spriteMissing.src,
    cry: cryMissing.src,

    type1: type1Missing.textContent,
    type1Class: type1Missing.className,

    type2: type2Missing.textContent,
    type2Class: type2Missing.className,

    weight: weightMissing.textContent,
    height: heightMissing.textContent,
    description: descMissing.textContent,
}
function resetPokemon() {
    numMissing.textContent = defaultPokemon.id
    nameMissing.textContent = defaultPokemon.name
    genMissing.textContent = defaultPokemon.genera
    spriteMissing.src = defaultPokemon.sprite
    cryMissing.src = defaultPokemon.cry

    type1Missing.textContent = defaultPokemon.type1
    type1Missing.className = defaultPokemon.type1Class

    type2Missing.textContent = defaultPokemon.type2
    type2Missing.className = defaultPokemon.type2Class
    type2Missing.style.display = ""

    weightMissing.textContent = defaultPokemon.weight
    heightMissing.textContent = defaultPokemon.height
    descMissing.textContent = defaultPokemon.description
}

const button = document.querySelector('.sound-btn');
const audio = document.getElementById('cry');

button.addEventListener('click', () => {
    audio.currentTime = 0; // Rewind to start if clicked repeatedly
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
        resetPokemon()
        return

    } else {
        errordiv.style.display = "none";
    }

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
        type2Poke.style.display = "inline-block";
        type2Poke.textContent = ditto.types[1].type.name
        type2Poke.className = `type ${ditto.types[1].type.name}`
    } else {
        type2Poke.style.display = "none";
    }

    const weightPoke = document.getElementById("weight")
    weightPoke.textContent = ditto.weight / 10 + " kg"

    const heightPoke = document.getElementById("height")
    heightPoke.textContent = ditto.height / 10 + " m"

    const descPoke = document.getElementById("description")
    descPoke.textContent = ditto.description.replace("\f", " ")
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
