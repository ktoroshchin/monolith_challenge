const fetch = require('node-fetch')

const OPTIONS = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
}

/**
 * @return {object} Pokemon grouped by type
 */
const getPokemons = async(url) => {
    const pokemonData = []

    try {
        const response = await fetch(url, OPTIONS)
        const pokemonList = await response.json()

        if(!pokemonList.results){
            throw new Error('Something went wrong')
        }
        for (const item of pokemonList.results) {
            const pokemonType = await getPokemonTypes(item)
            pokemonData.push({name: item.name, type: pokemonType})
        } 

        return groupPokemons(pokemonData)
    } catch(err) {
        return err
    } 

}

/**
 * Function fetches one pokemon types
 * @param {object} pokemon Single pokemon data object 
 */
async function getPokemonTypes(pokemon) {
    const url = pokemon.url
    try {
        const data = await fetch(url, OPTIONS)
        const pokemonType = await data.json()

        if(!pokemonType.types) {
            throw new Error('Something went wrong')
        }

        return pokemonType.types.map(item => item.type.name)
    } catch(err){
        return err
    }
}

/**
 * Function groupes pokemons by type
 * @param {[]} data Array of pokemon data
 */
function groupPokemons(data) {
    let obj = {}

    if(data) {
        data.forEach(item => {
            item.type.forEach(name => {
                if(!obj[name]) {
                    obj = {
                        ...obj,
                        [name]: []
                    }
                } 
                obj = {
                    ...obj,
                    [name]: [...obj[name],item.name]
                }
            })
        })
    }
    
    return obj
}

const getPokemonsDelayed = () => {
    for(let i = 0; i < 3; i++) {
        let interval = 3000
        setTimeout((param)=> {
            getPokemons('https://pokeapi.co/api/v2/pokemon?limit=20').then(result => console.log(`************  API fetch delay was ${param} milliseconds  *************`, result))
        }, interval * i, interval * i)
    }
}

getPokemonsDelayed()


