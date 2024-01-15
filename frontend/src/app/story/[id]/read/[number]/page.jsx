import styles from "./page.module.css";

export default function Read({ params: { id, number } }) {
  return (
    <div className={styles.read_wrapper}>
      <div>{id}</div>
      <div>{number}</div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus
        architecto molestias dicta quae ea vel iste doloribus mollitia fugit
        voluptatibus quisquam molestiae, laborum atque odit unde cumque quasi,
        quas beatae dignissimos animi! Doloremque perferendis quasi assumenda
        dolorum repellendus! Sequi quam quae laudantium voluptatem sint totam
        necessitatibus rerum harum similique quidem. Natus impedit autem, minus
        non dignissimos quisquam? Eaque expedita quibusdam, dicta saepe in
        illum, quae cumque quod fugit et modi? Aliquid nam maxime, numquam,
        cumque fuga deleniti dolor quis necessitatibus eligendi eos quos
        temporibus veniam dolorum expedita quia. Quae repellendus quia libero
        neque in deserunt aliquid dolores necessitatibus quos autem.
      </div>
    </div>
  );
}
