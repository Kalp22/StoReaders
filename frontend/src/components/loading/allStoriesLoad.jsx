import StoriesLoad from "@/components/loading/storiesLoad";
import styles from "./storiesLoad.module.css"

export default function AllStoriesLoad() {
    return (
        <>
        <div className={styles.swip_load}></div>
    <StoriesLoad />
        </>
    )
}