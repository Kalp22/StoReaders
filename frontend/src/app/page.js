"use client";
import styles from "./page.module.css";

import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

import Navbar from "@/components/navbar/navbar";
import Landing from "@/components/landing/landing";
import LatestStory from "@/components/latestStory/latestStory";
import Stories from "@/components/fetch/stories";

import SpinnerLoad from "@/components/loading/spinnerLoad";
import StoriesLoad from "@/components/loading/storiesLoad";

import { FaBook } from "react-icons/fa6";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cachedStories, setCachedStories] = useLocalStorage("stories", null);
  const [cachedTime, setCachedTime] = useLocalStorage("time", null);
  const [numberOfReloads, setNumberOfReloads] = useLocalStorage("reloads", 0);

  useEffect(() => {
    // Fetch stories from the API
    const fetchStories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}stories/getAll`
        );
        const data = await res.json();
        setData(data);
        setCachedStories(data);
        setCachedTime(new Date().getTime());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Check if the stories are cached and if they are not older than 1 hour
    const checkIfFetchStories = async () => {
      if (cachedStories && new Date().getTime() - cachedTime < 1000 * 60 * 60) {
        setData(cachedStories);
        setLoading(false);
        return;
      }
      fetchStories();
    };

    // Increment the number of reloads
    setNumberOfReloads(numberOfReloads + 1);
    // If the number of reloads is greater than 5, reset it and fetch the stories
    if (numberOfReloads > 5) {
      setNumberOfReloads(0);
      fetchStories();
    } else {
      checkIfFetchStories();
    }

    // Cleanup function to reset the data and loading state
    return () => {
      setData(null);
      setLoading(true);
    };
  }, []);

  return (
    <main className={styles.main}>
      <Navbar landing={true} />
      {loading ? (
        <div className={styles.loading}>
          <SpinnerLoad />
          <FaBook size={80} className={styles.book} />
        </div>
      ) : (
        <Landing />
      )}
      <LatestStory />
      {loading ? <StoriesLoad /> : <Stories description={false} data={data} />}
    </main>
  );
}
