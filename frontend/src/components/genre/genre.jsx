import styles from './genre.module.css';

export default function Genre({ genre, index}) {
    return(
        <div className={styles.genre}>
            {genre}
        </div>
    )
}