"use client";
import styles from "./navbar.module.css";

import { Quicksand } from "next/font/google";
import { Merriweather } from "next/font/google";

import { useState, useEffect } from "react";

import Link from "next/link";

import { FaUser } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import DarkLight from "../ui/darklight/page";

const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Navbar({ landing }) {
  const [user, setUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setMenuOpen(false);
      }
    };

    const handleScroll = landing
      ? () => {
          setScrolling(window.scrollY > window.innerHeight - 90);
        }
      : () => {
          setScrolling(true);
        };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // No need to include window.innerWidth in the dependency array

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);

  return (
    <nav
      className={`${styles.navbar_wrapper} ${
        scrolling ? styles.scrolling : ""
      }`}
    >
      <div className={styles.navbar_cover}>
        <div className={`${styles.navbar_left_cover} ${quicksand.className}`}>
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
                <p className={merriweather.className}>
                  {JSON.parse(user).username}
                </p>
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
              <div className={quicksand.className}>
                <Link href="/login">LOG IN</Link>
              </div>
              <div className={quicksand.className}>
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
      <div
        className={`${scrolling ? styles.navbar_line : styles.no_line}`}
      ></div>
      <div className={`${styles.menu_dialog} ${menuOpen ? styles.open : ""}`}>
        <div className={quicksand.className}>
          <div>
            <Link href="/" style={{ width: "100%" }}>
              HOME
            </Link>
          </div>
          <div>
            <Link href="/about" style={{ width: "100%" }}>
              ABOUT
            </Link>
          </div>
          <div>
            <Link href="/stories" style={{ width: "100%" }}>
              READ
            </Link>
          </div>
        </div>
        <div>
          {user ? (
            <div>
              <Link
                href="/user/dashboard"
                style={{ width: "100%" }}
                className={styles.useralt}
              >
                <FaUser className={styles.user_image} />
                <p className={merriweather.className}>
                  {JSON.parse(user).username}
                </p>
              </Link>
            </div>
          ) : (
            <>
              <div className={quicksand.className}>
                <Link href="/login" style={{ width: "100%" }}>
                  LOG IN
                </Link>
              </div>
              <div className={quicksand.className}>
                <Link href="/signup" style={{ width: "100%" }}>
                  SIGN UP
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
