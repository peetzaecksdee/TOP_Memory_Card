import Header from './components/Header'
import Main from './components/Main'
import '@fontsource/nunito'
import '@fontsource/nunito/600.css'
import './App.css'
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
	const [maxScore, setMaxScore] = useState(score);

  return (
    <>
      <Header score={score} maxScore={maxScore} />
      <Main />
    </>
  )
}

export default App
