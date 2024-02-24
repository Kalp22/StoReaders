"use client";

import styles from "./page.module.css";

import { useState, useEffect } from "react";

import Navbar from "@/components/navbar/navbar";
import Landing from "@/components/landing/landing";
import LatestStory from "@/components/latestChapter/latestChapter";
import About from "@/components/about/about";
import Stories from "@/components/fetch/stories";

import SpinnerLoad from "@/components/loading/spinnerLoad";
import StoriesLoad from "@/components/loading/storiesLoad";

import { FaBook } from "react-icons/fa6";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}stories/getAll`
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <main className={styles.main}>
      <Navbar landing={true} />
      {loading ? (
        <div className={styles.loading}>
          <SpinnerLoad />
          <FaBook size={30} className={styles.book} />
        </div>
      ) : (
        <Landing />
      )}
      <LatestStory />
      {loading ? <StoriesLoad /> : <Stories description={false} data={data} />}
      <About />
    </main>
  );
}
