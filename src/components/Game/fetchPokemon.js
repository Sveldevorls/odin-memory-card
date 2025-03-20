export default function fetchPokemon(id) {
    const API_URL = "https://pokeapi.co/api/v2/pokemon/"

    return (
        fetch(API_URL + id)
            .then(result => {
                if (result.status >= 400) {
                    throw new Error(`Error fetching Pokemon ${id}: returned code ${result.status}`)
                }
                return result.json()
            })
    )
}