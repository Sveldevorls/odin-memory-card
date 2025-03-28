import { useState } from 'react';
import './App.css';
import Game from './components/Game/Game';
import Menu from './components/Menu/Menu';

export default function App() {
	const [showMenu, setShowMenu] = useState(true);
	const [showGame, setShowGame] = useState(false);
	const [cardCount, setCardCount] = useState(1);

	function handleStartGameClick(cardCount) {
		setCardCount(cardCount);
		setShowMenu(false);
		setShowGame(true);
	}

	function handleExitGameClick() {
		setCardCount(0);
		setShowMenu(true);
		setShowGame(false);
	}

	return (
		<>
			{showMenu && <Menu onStartGameClick={handleStartGameClick}/>}
			{showGame && <Game onExitGameClick={handleExitGameClick} cardCount={cardCount}/>}
		</>
	)
}