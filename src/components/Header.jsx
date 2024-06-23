function Header({ score, maxScore }) {
  return (
    <header>
      <span className='title'>Memory Cards</span>
      <div className='score-container'>
				<span className='score'>Score: {score}</span>
				<span className='score'>Max score: {maxScore} </span>
			</div>
    </header>
  )
}

Header.propTypes = {
  score: Number,
  maxScore: Number,
}

export default Header;