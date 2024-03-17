import styles from './genre.module.css';

export default function Genre({ genre}) {
    return(
        <div className={styles.genre}>
            {genre}
        </div>
    )
}