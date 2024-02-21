import mainStyles from "../page.module.css";
import styles from "./page.module.css";

export default function About() {
  return (
    <>
      <div className={mainStyles.empty_div_below_navbar}></div>
      <div className={styles.about_wrapper}>
        <div className={styles.about_text_wrapper}>
          <div className={styles.about_text}>About</div>
          <div className={styles.about_underline}></div>
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia optio
          cum hic blanditiis ea deserunt ab tempora, alias iusto ullam libero
          quidem illo dolores fugit? Nulla qui laudantium quae voluptatem
          ducimus perspiciatis quasi velit officiis beatae, est illo repellat
          quaerat laboriosam voluptatibus accusantium expedita nobis tempora,
          neque voluptate, temporibus assumenda maiores. Delectus nulla earum
          iure consequatur numquam inventore, tempore distinctio et amet eius
          facilis provident enim nam, laborum molestiae porro similique, eaque
          laudantium sit neque modi tenetur. Omnis officia saepe, sapiente
          pariatur eos officiis maxime cumque, ullam fugit laboriosam distinctio
          modi sed, culpa placeat est corporis esse maiores! Recusandae, soluta!
        </div>
      </div>
    </>
  );
}
