import styles from "./Menu.module.css"

export default function Menu({ onStartGameClick }) {
    return (
        <div className={styles.menu}>
            <button onClick={() => onStartGameClick(5)}>Easy</button>
            <button onClick={() => onStartGameClick(10)}>Medium</button>
            <button onClick={() => onStartGameClick(15)}>Hard</button>
        </div>
    )
}