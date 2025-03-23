import styles from "./Menu.module.css"

export default function Menu({ onStartGameClick }) {
    return (
        <div className={styles.menu}>
            <h1>Pokemon memory game</h1>
            <button onClick={() => onStartGameClick(5)}>Easy</button>
            <button onClick={() => onStartGameClick(10)}>Medium</button>
            <button onClick={() => onStartGameClick(15)}>Hard</button>
        </div>
    )
}