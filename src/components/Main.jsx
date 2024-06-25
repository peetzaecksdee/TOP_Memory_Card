import Card from './Card';

function Main({ cards, onClick }) {
	return (
		<main>
			<div className='card-container'>
				{cards.map(([name, image]) => (
					<Card
						key={name}
						title={name}
						src={image}
						onClick={() => onClick(name)}
					/>
				))}
			</div>
		</main>
	);
}

export default Main;
