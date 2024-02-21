"use client";
import styles from "./page.module.css";

import DashboardLeft from "@/components/dashboardLeft/dashboardLeft";
import DashboardCenter from "@/components/dashboardCenter/dashboardCenter";
import DashboardRight from "@/components/dashboardRight/dashboardRight";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}user/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        username: user.username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data.user);
      });
  }, []);

  return (
    <>
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
            />
          )}
        </div>
        <div className={styles.dashboard_right}>
          <DashboardRight />
        </div>
      </div>
      <Toaster theme={theme ? "dark" : "light"} position="bottom-left" />
    </>
  );
}
