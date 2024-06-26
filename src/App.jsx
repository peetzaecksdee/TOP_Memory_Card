import Header from './components/Header';
import Main from './components/Main';
import '@fontsource/nunito';
import '@fontsource/nunito/600.css';
import './App.css';
import { useEffect, useState } from 'react';

const pokemonCount = 76;

function App() {
	const [score, setScore] = useState(0);
	const [maxScore, setMaxScore] = useState(score);
	const [pokemonData, setPokemonData] = useState([]);

	// I'm going fucking insane
	async function randomPokemons(count) {
		const res = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=${Math.floor(
				Math.random() * pokemonCount
			)}/`
		);
		const res_1 = await res.json();
		const res_2 = await Promise.all(
			res_1.results.map((res_2) => fetch(res_2.url))
		);
		return await Promise.all(res_2.map(async (res_3) => {
			const res_4 = await res_3.json();
			return {
				name: res_4.name,
				sprite: res_4.sprites.other.showdown.front_default,
				isClick: false,
			};
		}));
	}

	useEffect(() => {
		(async function fetchData() {
			try {
				const response = await randomPokemons(15);
				setPokemonData(response);
			} catch (error) {
				console.error(`Error fetching Pokemon data: ${error}`);
			}
		})();
	}, []);

	function shuffleData() {
		if (pokemonData.length > 0) {
			setPokemonData([...pokemonData].sort(() => 0.5 - Math.random()));
		}
	}

	function resetGame() {}

	function handleClick(e) {
		if (
			pokemonData.find((pokemon) => {
				return pokemon.name === e.target.name && pokemon.isClick;
			})
		) {
			resetGame();
		}
	}

	return (
		<>
			<Header score={score} maxScore={maxScore} />
			<Main cards={pokemonData} onClick={(e) => handleClick(e)} />
		</>
	);
}

export default App;
