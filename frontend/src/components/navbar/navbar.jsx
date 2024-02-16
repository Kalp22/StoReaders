"use client";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";

import DarkLight from "../ui/darklight/page";

export default function Navbar() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []); // Run this effect only once on component mount

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
          <div>
            <Link href="/">StoReaders</Link>
          </div>
        </div>
        <div className={styles.navbar_right_cover}>
          <DarkLight />
          <div className={styles.partitioner}></div>
          {user ? (
            <>
              <Link href="/user/dashboard" className={styles.user}>
                <FaUser className={styles.userImg} />
                <p>{JSON.parse(user).username}</p>
              </Link>
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
          <IoIosMenu
            className={styles.menu}
            onClick={() => {
              const dialog = document.querySelector("#menuDialog");
              dialog.showModal();
              dialog.classList.toggle(styles.open);
            }}
          />
        </div>
      </div>
      <div className={styles.navbar_line}></div>
      <dialog id="menuDialog" className={styles.menu_dialog}>
        <div>
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
        <div>
          {user ? (
            <Link href="/user/dashboard" className={styles.user}>
              <FaUser className={styles.userImg} />
              <p>{JSON.parse(user).username}</p>
            </Link>
          ) : (
            <>
              <Link href="/login">LOG IN</Link>
              <Link href="/signup">SIGN UP</Link>
            </>
          )}
        </div>
      </dialog>
    </nav>
  );
}
