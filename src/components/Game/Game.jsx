import { useEffect, useRef, useState } from 'react';
import fetchPokemon from './fetchPokemon';
import Card from '../Card/Card';
import styles from "./Game.module.css";

export default function Game({ onExitGameClick, cardCount }) {
    const [pokemons, setPokemons] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedIDs, setSelectedIDs] = useState([])
    const [bestScore, setBestScore] = useState(0)
    const [endScreenMessage, setEndScreenMessage] = useState("")

    const dialogRef = useRef(null)

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            fetchPokemons(cardCount);
        }
        return (() => {
            ignore = true
        })
    }, [])

    function fetchPokemons(count) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

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

    function shuffleDeck() {
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

    function handleCardClick(id) {
        if (selectedIDs.includes(id)) {
            setEndScreenMessage("You lost!");
            dialogRef.current.showModal();
            return
        }
        else {
            let nextSelectedIDs = [...selectedIDs, id];
            setSelectedIDs(() => [...selectedIDs, id]);
            setBestScore(Math.max(bestScore, selectedIDs.length + 1))
            if (nextSelectedIDs.length == pokemons.length) {
                setEndScreenMessage("You won!");
                dialogRef.current.showModal();
                return
            }
        }

        shuffleDeck();
    }

    if (loading) return <h1>Fetching data...</h1>
    if (error) return <h1>{error.message}</h1>

    return (
        <>
        <div>
            <div className={styles.scoreboard}>
                {selectedIDs.length} / {pokemons.length}<br />
                Best score: {bestScore}
            </div>
            <div className={styles.gameboard}>
                {pokemons && pokemons.map(pokemon =>
                    <Card
                        pokemon={pokemon}
                        onCardClick={() => handleCardClick(pokemon.id)}
                        key={pokemon.id}
                    />
                )}
            </div>
        </div>
        <dialog ref={dialogRef}>
            <h1>{endScreenMessage}</h1>
            <p>Your score: {selectedIDs.length}</p>
            <div><button onClick={() => {setSelectedIDs([]); shuffleDeck(); dialogRef.current.close()}}>Play again</button></div>
            <div><button onClick={onExitGameClick}>Exit to menu</button></div>
        </dialog>
        </>
    )
}