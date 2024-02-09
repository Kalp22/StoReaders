"use client";
import styles from "./page.module.css";

import DarkLight from "@/components/ui/darklight/page";
import DashboardLeft from "@/components/dashboardLeft/dashboardLeft";
import DashboardCenter from "@/components/dashboardCenter/dashboardCenter";
import DashboardRight from "@/components/dashboardRight/dashboardRight";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    readStories: [{ storyId: "", noOfChapters: 0 }],
    reviews: [{ storyId: "" }],
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/");
      return;
    }
    fetch(`${process.env.API_URL}user/get`, {
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
    <div className={styles.dashboard_wrapper}>
      <div className={styles.dashboard_top}>
        <div className={styles.home_button}>
          <Link href="/">HOME </Link>
        </div>
        <DarkLight />
      </div>
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
              username={userDetails.username}
              reviews={userDetails.reviews}
            />
          )}
        </div>
        <div className={styles.dashboard_right}>
          <DashboardRight />
        </div>
      </div>
    </div>
  );
}
