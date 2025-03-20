import { useState } from 'react';
import './App.css';
import Game from './components/Game/Game';
import Menu from './components/Menu/Menu';

export default function App() {
	const [showMenu, setShowMenu] = useState(true);
	const [showGame, setShowGame] = useState(false);

	function handleStartGameClick() {
		setShowMenu(false);
		setShowGame(true);
	}

	return (
		<>
			{showMenu && <Menu onStartGameClick={handleStartGameClick}/>}
			{showGame && <Game />}
		</>
	)
}