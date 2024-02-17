"use client";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import DarkLight from "../ui/darklight/page";

export default function Navbar() {
  const [user, setUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // No need to include window.innerWidth in the dependency array

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);

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
              <div>
                <IoIosMenu
                  className={`${styles.menu} ${
                    menuOpen ? styles.menu_closed : ""
                  }`}
                  onClick={toggleMenu}
                />
                <IoCloseOutline
                  className={`${
                    menuOpen ? styles.menu_open : styles.menu_closed
                  }`}
                  onClick={toggleMenu}
                />
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
          <div>
            <IoIosMenu
              className={`${styles.menu} ${menuOpen ? styles.menu_closed : ""}`}
              onClick={toggleMenu}
            />
            <IoCloseOutline
              className={`${menuOpen ? styles.menu_open : styles.menu_closed}`}
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>
      <div className={styles.navbar_line}></div>
      <div className={`${styles.menu_dialog} ${menuOpen ? styles.open : ""}`}>
        <div>
          <div>
            <Link href="/" style={{width: "100%"}}>HOME</Link>
          </div>
          <div>
            <Link href="/about" style={{width: "100%"}}>ABOUT</Link>
          </div>
          <div>
            <Link href="/stories" style={{width: "100%"}}>READ</Link>
          </div>
        </div>
        <div>
          {user ? (
            <div>
              <Link href="/user/dashboard" style={{width: "100%"}} className={styles.useralt}>
                <FaUser className={styles.user_image} />
                <p>{JSON.parse(user).username}</p>
              </Link>
            </div>
          ) : (
            <>
              <div>
                <Link href="/login" style={{width: "100%"}}>LOG IN</Link>
              </div>
              <div>
                <Link href="/signup" style={{width: "100%"}}>SIGN UP</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
