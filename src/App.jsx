import Header from './components/Header';
import Main from './components/Main';
import '@fontsource/nunito';
import '@fontsource/nunito/600.css';
import './App.css';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';

const pokemonCount = 76;

function App() {
	const [score, setScore] = useState(0);
	const [maxScore, setMaxScore] = useState(score);
	const [pokemonData, setPokemonData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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
		return await Promise.all(
			res_2.map(async (res_3) => {
				const res_4 = await res_3.json();
				return {
					name: res_4.name,
					sprite: res_4.sprites.other.showdown.front_default,
					isClick: false,
				};
			})
		);
	}

	async function fetchData() {
		try {
			setIsLoading(true);
			const response = await randomPokemons(15);
			setIsLoading(false);
			setPokemonData(response);
		} catch (error) {
			console.error(`Error fetching Pokemon data: ${error}`);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	function incrementScore() {
		setScore(score + 1);
		if (score + 1 > maxScore) {
			setMaxScore(score + 1);
		}
	}

	function shufflePokemons() {
		setPokemonData(pokemonData => [...pokemonData].sort(() => 0.5 - Math.random()));
	}

	function setPokemon(pokemonName) {
		setPokemonData( pokemonData =>
			pokemonData.map((pokemon) => {
				return pokemon.name === pokemonName
					? { ...pokemon, isClick: true }
					: pokemon;
			})
		);
	}

	function resetGame() {
		setScore(0);
		fetchData();
	}

	function handleClick(e) {
		if (
			pokemonData.find((pokemon) => {
				return pokemon.name === e && pokemon.isClick;
			})
		) {
			resetGame();
			return;
		}

		incrementScore();
		setPokemon(e);
		shufflePokemons();
	}

	return (
		<>
			<Header score={score} maxScore={maxScore} />
			<Main cards={pokemonData} onClick={(e) => handleClick(e)} className={isLoading && 'blur'} />
			<Modal score={score} className={!isLoading && 'hidden'}/>
		</>
	);
}

export default App;
