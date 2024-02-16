import styles from "./page.module.css";

import DarkLight from "@/components/ui/darklight/page";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className={styles.dashboard_top}>
        <div className={styles.home_button}>
          <Link href="/">HOME </Link>
        </div>
        <DarkLight />
      </div>
      {children}
    </>
  );
}
