import Header from './components/Header';
import Main from './components/Main';
import '@fontsource/nunito';
import '@fontsource/nunito/600.css';
import './App.css';
import { useEffect, useState } from 'react';

const pokemonCount = 760;
const api = 'https://pokeapi.co/api/v2/pokemon/';

function App() {
	const [score, setScore] = useState(0);
	const [maxScore, setMaxScore] = useState(score);
	const [pokemonData, setPokemonData] = useState([]);

	function randomPokemon() {
		return fetch(`${api}${Math.floor(Math.random() * pokemonCount + 1)}/`);
	}

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await Promise.all(
					Array.from({ length: 10 }, () => randomPokemon(10))
				);
				const pokemons = await Promise.all(
					res.map((response) => response.json())
				);
				const pokemonsData = pokemons.map((obj) => [
					obj.name,
					obj.sprites.other.showdown.front_default,
				]);
				setPokemonData(pokemonsData);
			} catch (error) {
				console.error(`Error fetching Pokemon data: ${error}`);
			}
		}
		fetchData();
	}, []);

	function shuffleData() {
		if (pokemonData.length > 0) {
			setPokemonData([...pokemonData].sort(() => 0.5 - Math.random()));
		}
	}

	return (
		<>
			<Header score={score} maxScore={maxScore} />
			<Main cards={pokemonData} onClick={() => shuffleData()} />
		</>
	);
}

export default App;
