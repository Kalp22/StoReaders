"use client";
import styles from "./navbar.module.css";

import Link from "next/link";

import { FaUser } from "react-icons/fa";

import DarkLight from "../ui/darklight/page";
import { use } from "react";

export default function Navbar() {
  const user = localStorage.getItem("user");

  return (
    <nav className={styles.navbar_wrapper}>
      <div className={styles.navbar_cover}>
        <div className={styles.navbar_left_cover}>
          <div>
            <Link href="/">HOME</Link>
          </div>
          <div>
            <Link href="/about">ABOUT</Link>
          </div>
          <div>
            <Link href="/stories">READ</Link>
          </div>
        </div>
        <div className={styles.navbar_right_cover}>
          <DarkLight />
          <div className={styles.partitioner}></div>
          {user ? (
            <>
              <div>
                <Link href="/user/dashboard">
                  <FaUser size={25} />
                  <p>{JSON.parse(user).username}</p>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link href="/login">LOG IN</Link>
              </div>
              <div>
                <Link href="/signup">SIGN UP</Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.navbar_line}></div>
    </nav>
  );
}
