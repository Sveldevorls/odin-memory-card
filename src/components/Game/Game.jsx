import { useEffect, useState } from 'react';
import fetchPokemon from './fetchPokemon';
import Card from '../Card/Card';
import styles from "./Game.module.css";

export default function Game() {
    const [pokemons, setPokemons] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            fetchPokemons(9);
        }
        return (() => {
            ignore = true
        })
    }, [])

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function fetchPokemons(count) {
        const MAX_ID = 1025;

        let ids = []
        for (let i = 0; i < count; i++) {
            let randomID = getRandomInt(1, MAX_ID);
            if (!ids.includes(randomID)) {
                ids.push(randomID);
            }
        }

        Promise.all(ids.map(id => fetchPokemon(id)))
            .then(resultArr => setPokemons(resultArr))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }

    function handleRandomizeClick() {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        const randomizedPokemons = pokemons.slice();
        shuffleArray(randomizedPokemons);
        setPokemons(randomizedPokemons);
    }

    if (loading) return <h1>Fetching data...</h1>
    if (error) return <h1>{error.message}</h1>

    return (
        <div>
            <button onClick={handleRandomizeClick}>Shuffle</button>
            <div className={styles.gameboard}>
                {pokemons && pokemons.map(pokemon => <Card pokemon={pokemon} key={pokemon.id} />)}
            </div>
        </div>
    )
}