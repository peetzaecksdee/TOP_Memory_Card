function Card({ title, src }) {
	return (
		<div className='card'>
			<img src={src} alt={title} />
			<span>{title}</span>
		</div>
	);
}

Card.propTypes = {
  title: String,
  src: String,
}

export default Card;
