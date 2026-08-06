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
        genera: getGenera(species.genera)
    }

    return result
}
(async () => {
    const ditto = await getPokemon("ditto")
    console.log(ditto.name)

    const pikachu = await getPokemon("pikachu")
    console.log(pikachu.name)
    const docPoke = document.getElementById("pokemon")
    docPoke.textContent = JSON.stringify(ditto)
    const numPoke = document.getElementById("pokenumber")
    const namePoke = document.getElementById("name")
    const genPoke = document.getElementById("genera")
    const spritePoke = document.getElementById("sprites")
    numPoke.textContent = ditto.id
    namePoke.textContent = ditto.name
    genPoke.textContent = ditto.genera
    spritePoke.setAttribute("src",ditto.sprite) 
    

})();
// id="pokenumber">
// id="name">
// id="flavorname">

// name description cry tipos sprite  https://pokeapi.co/api/v2/pokemon-species/132/
// species.flavor_text_entries[] language.name = "en"
