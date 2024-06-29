import { useState } from 'react';

function Header({ score, maxScore, difficultyChange }) {
	const [active, setActive] = useState(1);
	return (
		<header>
			<span className='title'>Memory Cards</span>
			<div className='difficulties-container'>
				<button
					className={`easy ${active === 1 ? 'active' : ''}`}
					onClick={() => {
						if (difficultyChange(1)) setActive(1);
					}}>
					Easy
				</button>
				<button
					className={`medium ${active === 2 ? 'active' : ''}`}
					onClick={() => {
						if (difficultyChange(2)) setActive(2);
					}}>
					Medium
				</button>
				<button
					className={`hard ${active === 3 ? 'active' : ''}`}
					onClick={() => {
						if (difficultyChange(3)) setActive(3);
					}}>
					Hard
				</button>
				<button
					className={`endless ${active === 0 ? 'active' : ''}`}
					onClick={() => {
						if (difficultyChange(0)) setActive(0);
					}}>
					Endless
				</button>
			</div>
			<div className='score-container'>
				<span className='score'>Score: {score}</span>
				<span className='score'>Max score: {maxScore} </span>
			</div>
		</header>
	);
}

Header.propTypes = {
	score: Number,
	maxScore: Number,
};

export default Header;
