import styles from './genre.module.css';

export default function Genre({ genre, key}) {
    return(
        <div className={styles.genre}>
            {genre}
        </div>
    )
}