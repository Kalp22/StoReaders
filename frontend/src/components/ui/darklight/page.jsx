import styles from "./page.module.css";

import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

export default function DarkLight() {
  return (
    <div className={styles.toggle_button}>
            <div>
              <MdOutlineLightMode size={"22px"} color={"#191518"} />
            </div>
            <div className={styles.toggle}></div>
            <div>
              <MdOutlineDarkMode size={"22px"} color={"#191518"} />
            </div>
          </div>
  )
}
