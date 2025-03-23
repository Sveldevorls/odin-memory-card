import styles from "./Card.module.css";

export default function Card({ pokemon, onCardClick }) {
    const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

    return (
        <div className={styles.card} onClick={onCardClick}>
            <img
                width="200"
                src={pokemon["sprites"]["other"]["official-artwork"]["front_default"]}
                alt={pokemon.name}
            />
            <p>{capitalize(pokemon.name)}</p>
        </div>
    )
}