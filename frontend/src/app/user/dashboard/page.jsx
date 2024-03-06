"use client";
import styles from "./page.module.css";

import DarkLight from "@/components/ui/darklight/page";
import DashboardLeft from "@/components/dashboardLeft/dashboardLeft";
import DashboardCenter from "@/components/dashboardCenter/dashboardCenter";
import DashboardRight from "@/components/dashboardRight/dashboardRight";
import SpinnerLoad from "@/components/loading/spinnerLoad";

import { FaBook } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster } from "sonner";
require("dotenv").config();

export default function UserDashboard() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    readStories: [{ storyId: "", noOfChapters: 0 }],
    reviews: [{ storyId: "" }],
  });
  const [theme, setTheme] = useState(true);
  const [rightOpen, setRightOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTheme = localStorage.getItem("theme");
      setTheme(storedTheme === "true");
    };

    // Check if window is defined to ensure it's executed on the client side
    if (typeof window !== "undefined") {
      // Attach event listener for changes in localStorage
      window.addEventListener("storage", handleStorageChange);

      // Initial setup
      handleStorageChange();

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []); // Empty dependency array as it runs once on mount

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    const fetchUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          username: user.username,
        }),
      });

      const data = await res.json();
      setLoading(false);
      setUserDetails(data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setRightOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleRight = () => {
    setRightOpen(!rightOpen);
  };

  return (
    <>
      <div className={styles.dashboard_top}>
        <div className={styles.home_button}>
          <Link href="/">HOME </Link>
        </div>
        <div className={styles.top_right}>
          <DarkLight />
          <div className={`${rightOpen ? styles.toggler : styles.toggler2}`}>
            <IoIosMenu
              onClick={toggleRight}
              className={`${styles.menu} ${
                rightOpen ? styles.close : styles.open
              }`}
            />
            <IoCloseOutline
              onClick={toggleRight}
              className={`${styles.menu} ${
                rightOpen ? styles.open : styles.close
              }`}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className={styles.loading}>
          <SpinnerLoad />
          <FaBook size={80} className={styles.book} />
        </div>
      ) : (
        <div className={styles.dashboard_cover}>
          <div className={styles.dashboard_left}>
            <DashboardLeft
              readStories={userDetails.readStories}
              readChapters={userDetails.readChapters}
              email={userDetails.email}
              username={userDetails.username}
            />
          </div>
          <div className={styles.dashboard_center}>
            {userDetails.readStories && userDetails.reviews && (
              <DashboardCenter
                readStories={userDetails.readStories}
                reviews={userDetails.reviews}
                user={user}
              />
            )}
          </div>
          <div
            className={`${styles.dashboard_right} ${
              rightOpen ? styles.dash_open : styles.dash_close
            }`}
          >
            <DashboardRight />
          </div>
        </div>
      )}
      <Toaster theme={theme ? "dark" : "light"} position="bottom-left" />
    </>
  );
}
