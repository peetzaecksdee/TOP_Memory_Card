import Card from './Card';

function Main({ cards, onClick, className }) {
	return (
		<main className={className}>
			<div className='card-container'>
				{cards.map((pokemon) => (
					<Card
						key={pokemon.name}
						title={pokemon.name}
						src={pokemon.sprite}
						onClick={() => onClick(pokemon.name)}
					/>
				))}
			</div>
		</main>
	);
}

export default Main;
