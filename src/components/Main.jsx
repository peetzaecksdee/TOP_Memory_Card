import Card from './Card';

function Main({ cards, onClick }) {
	return (
		<main>
			<div className='card-container'>
				{cards.map((pokemon) => (
					<Card
						key={pokemon.name}
						title={pokemon.name}
						src={pokemon.sprite}
						onClick={(e) => onClick(e)}
					/>
				))}
			</div>
		</main>
	);
}

export default Main;
