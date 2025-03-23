import { useState } from "react"
import styles from "./Menu.module.css"

export default function Menu({ onStartGameClick }) {
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customCardCount, setCustomCardCount] = useState(1);

    function handleCustomGameStartClick(){
        const cardCountNumber = parseInt(customCardCount, 10);
        if (cardCountNumber < 1 || cardCountNumber > 1025) {
            return
        }

        onStartGameClick(cardCountNumber);
    }

    return (
        <div className={styles.menu}>
            {showCustomInput &&
                <>
                    <label htmlFor="cardCount">Enter card count (1 - 1025)</label>
                    <input type="number" min="1" max="1025" onChange={(e) => setCustomCardCount(e.target.value)} value={customCardCount} id="cardCount" autoFocus></input>
                    <button onClick={handleCustomGameStartClick}>Start game</button>
                    <button onClick={() => setShowCustomInput(false)}>Return to previous screen</button>
                </>
            }
            {!showCustomInput &&
                <>
                    <h1>Pokemon memory game</h1>
                    <button onClick={() => onStartGameClick(5)}>Easy</button>
                    <button onClick={() => onStartGameClick(10)}>Medium</button>
                    <button onClick={() => onStartGameClick(15)}>Hard</button>
                    <button onClick={() => setShowCustomInput(true)}>Custom</button>
                </>
            }
        </div>
    )
}