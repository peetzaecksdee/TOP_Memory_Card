import { useState } from 'react';

function Main() {
	const [score, setScore] = useState(0);

	return (
		<main>
			<div className='score-container'>
				<span className='score'>Score: {score}</span>
			</div>
		</main> 
	);
}

export default Main;
