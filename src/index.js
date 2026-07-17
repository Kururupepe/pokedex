async function getData(dominio, pokemon) {
    const url = `https://pokeapi.co/api/v2/${dominio}/${pokemon}`;
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

function getdescription(flavor_text_entries) {
    for (const flavor of flavor_text_entries) {
        if (flavor.language !== undefined && flavor.language.name === "en") {
            return flavor.flavor_text
        }
    }

}

const ditto = await getData("pokemon", "pikachu")
console.log(ditto.name)
let name = ditto.name
let id = ditto.id
let species = await getData("pokemon-species", id)
let description = getdescription(species.flavor_text_entries)
let cry = ditto.cries.latest
let types = ditto.types
let sprites = ditto.sprites.front_default

// name description cry tipos sprite  https://pokeapi.co/api/v2/pokemon-species/132/
// species.flavor_text_entries[] language.name = "en"
