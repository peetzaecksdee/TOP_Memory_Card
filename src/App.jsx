// TODO: Difficulties w/ Endless

import Header from './components/Header';
import Main from './components/Main';
import '@fontsource/nunito';
import '@fontsource/nunito/600.css';
import './App.css';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';

const pokemonCount = 76;

function randomWinningText() {
	const winningTexts = [
		'Good job!',
		'Great work!',
		'You did it!',
		'Well done!',
		'Sensational!',
	];
	return winningTexts[Math.floor(Math.random() * winningTexts.length)];
}

function randomLosingText() {
	const losingTexts = [
		'Keep trying!',
		'You can do it!',
		'You can do better!',
		'Better luck next time!',
		'You can do it next time!',
	];
	return losingTexts[Math.floor(Math.random() * losingTexts.length)];
}

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

	function fetchData() {
		setIsLoading(true);
		// To make modal persists
		setTimeout(async () => {
			try {
				const response = await randomPokemons(15);
				setIsLoading(false);
				setScore(0);
				setPokemonData(response);
			} catch (error) {
				console.error(`Error fetching Pokemon data: ${error}`);
			}
		}, 3000);
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
		setPokemonData((pokemonData) =>
			[...pokemonData].sort(() => 0.5 - Math.random())
		);
	}

	function setPokemon(pokemonName) {
		setPokemonData((pokemonData) =>
			pokemonData.map((pokemon) => {
				return pokemon.name === pokemonName
					? { ...pokemon, isClick: true }
					: pokemon;
			})
		);
	}

	function resetGame() {
		fetchData();
	}

	function handleClick(e) {
		if (
			pokemonData.find((pokemon) => {
				return pokemon.name === e && pokemon.isClick;
			}) ||
			score + 1 === 15
		) {
			if (score + 1 === 15) {
				incrementScore();
			}
			resetGame();
			return;
		}

		incrementScore();
		setPokemon(e);
		shufflePokemons();
	}

	function DiffLoading() {
		if (score === 0) {
			return <h1>! Loading Game !</h1>;
		} else if (score === 15) {
			return (
				<>
					<h1>!!! You win !!!</h1>
					<span>{randomWinningText()}</span>
					<span>Resetting...</span>
				</>
			);
		} else {
			return (
				<>
					<h1>! Game Over !</h1>
					<span>You scored {score}</span>
					<span>{randomLosingText()}</span>
					<span>Resetting...</span>
				</>
			);
		}
	}

	return (
		<>
			<Header score={score} maxScore={maxScore} />
			<Main
				cards={pokemonData}
				onClick={handleClick}
				className={isLoading && 'blur'}
			/>
			<Modal score={score} className={!isLoading && 'hidden'}>
				{isLoading ? (
					<DiffLoading />
				) : (
					<>
						<h1>! Game Ready !</h1>
						<span>Enjoy!</span>
					</>
				)}
			</Modal>
		</>
	);
}

export default App;
