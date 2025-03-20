import { useState } from 'react';
import fetchPokemon from './fetchPokemon';
import './App.css';
import Card from './components/Card/Card';

export default function App() {
	const [pokemons, setPokemons] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const ids = [1, 2, 3, 4, 5]

	function handleFetchClick() {
		setLoading(true)
		Promise.all(ids.map(id => fetchPokemon(id)))
			.then(resultArr => setPokemons(resultArr))
			.catch(error => setError(error))
			.finally(() => setLoading(false))
	}

	if (loading) return <h1>Fetching data...</h1>
	if (error) return <h1>{error.message}</h1>

	return (
		<div>
			<button onClick={handleFetchClick}>Click to fetch</button>
			{pokemons && pokemons.map(pokemon => <Card pokemon={pokemon} key={pokemon.id}/>)}
		</div>
	)
}