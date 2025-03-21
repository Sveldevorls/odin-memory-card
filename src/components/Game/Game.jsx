import { useState } from 'react';
import fetchPokemon from './fetchPokemon';
import Card from '../Card/Card';
import styles from "./Game.module.css";

export default function Game() {
    const [pokemons, setPokemons] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const MAX_ID = 1025

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function handleFetchClick(count) {
        setLoading(true)

        let ids = []
        for (let i = 0; i < count; i++) {
            ids.push(getRandomInt(1, MAX_ID));
        }

        Promise.all(ids.map(id => fetchPokemon(id)))
            .then(resultArr => setPokemons(resultArr))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }

    if (loading) return <h1>Fetching data...</h1>
    if (error) return <h1>{error.message}</h1>

    return (
        <div>
            <button onClick={() => handleFetchClick(9)}>Click to fetch</button>
            <div className={styles.gameboard}>
                {pokemons && pokemons.map(pokemon => <Card pokemon={pokemon} key={pokemon.id} />)}
            </div>
        </div>
    )
}