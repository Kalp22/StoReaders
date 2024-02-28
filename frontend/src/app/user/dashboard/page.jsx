"use client";
import styles from "./page.module.css";

import DashboardLeft from "@/components/dashboardLeft/dashboardLeft";
import DashboardCenter from "@/components/dashboardCenter/dashboardCenter";
import DashboardRight from "@/components/dashboardRight/dashboardRight";
import SpinnerLoad from "@/components/loading/spinnerLoad";

import { FaBook } from "react-icons/fa6";

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
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

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

  return (
    <>
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
          <div className={styles.dashboard_right}>
            <DashboardRight />
          </div>
        </div>
      )}
      <Toaster theme={theme ? "dark" : "light"} position="bottom-left" />
    </>
  );
}
