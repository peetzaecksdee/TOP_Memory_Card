import Header from './components/Header';
import Main from './components/Main';
import '@fontsource/nunito';
import '@fontsource/nunito/600.css';
import './App.css';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';

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

const difficultyChart = {
	0: 5,
	1: 5,
	2: 10,
	3: 15,
};

function App() {
	const [score, setScore] = useState(0);
	const [maxScore, setMaxScore] = useState(score);
	const [pokemonData, setPokemonData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// 0 = Endless 1 = Easy 2 = Medium 3 = Hard
	const [difficulty, setDifficulty] = useState(1);
	const [pokemonCount, setPokemonCount] = useState(difficultyChart[1]);
	// for endless
	let lose = false;

	// I'm going fucking insane
	async function randomPokemons(count) {
		const res = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=${Math.floor(
				Math.random() * 760
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

	function fetchData(count) {
		setIsLoading(true);
		// To make modal persists
		try {
			setTimeout(async () => {
				const response = await randomPokemons(count || pokemonCount);
				setIsLoading(false);
				if (difficulty !== 0 || lose) {
					setScore(0);
				}
				setPokemonData(response);
			}, 1000);
		} catch (error) {
			console.error(`Error fetching Pokemon data: ${error}`);
			fetchData(count || pokemonCount);
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

	function handleClick(e) {
		if (
			pokemonData.find((pokemon) => {
				return pokemon.name === e && pokemon.isClick;
			}) ||
			(difficulty === 0 && (score + 1) % difficultyChart[difficulty] === 0) ||
			score + 1 === difficultyChart[difficulty]
		) {
			if (
				pokemonData.find((pokemon) => {
					return pokemon.name === e && pokemon.isClick;
				})
			) {
				lose = true;
			} else {
				incrementScore();
			}
			fetchData();
			return;
		}

		incrementScore();
		setPokemon(e);
		shufflePokemons();
	}

	function DiffLoading() {
		if (score === 0) {
			return <h1>! Loading Game !</h1>;
		} else if (score === difficultyChart[difficulty] || (difficulty === 0 && score % difficultyChart[difficulty] === 0)) {
			return (
				<>
					{difficulty !== 0 && (
						<>
							<h1>!!! You win !!!</h1>
							<span>{randomWinningText()}</span>
						</>
					)}
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

	function difficultyChange(difficulty) {
		if (isLoading) return false;

		setDifficulty(difficulty);
		fetchData(difficultyChart[difficulty]);
		setPokemonCount(difficultyChart[difficulty]);
		return true;
	}

	return (
		<>
			<Header
				score={score}
				maxScore={maxScore}
				difficultyChange={difficultyChange}
			/>
			<Main
				cards={pokemonData}
				onClick={handleClick}
				className={isLoading ? 'blur' : ''}
			/>
			<Modal score={score} className={!isLoading ? 'hidden' : ''}>
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
