function Card({ title, src, onClick }) {
	return (
		<div className='card' onClick={onClick}>
			<img src={src} alt={title} />
			<span>{title}</span>
		</div>
	);
}

export default Card;
