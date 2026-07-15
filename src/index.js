async function getData(pokemon) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
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

const ditto = await getData("ditto")
console.log(ditto.weight)
const pikachu = await getData("pikachu")
console.log(pikachu.weight)


