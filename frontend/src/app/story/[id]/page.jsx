"use client";
import styles from "./page.module.css";

import { Nunito } from "next/font/google";
import { Open_Sans } from "next/font/google";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "react-intersection-observer";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FaBook } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

import { Toaster } from "sonner";

import Navbar from "@/components/navbar/navbar";
import Chapters from "@/components/chapters/chapters";
import Reviews from "@/components/reviews/reviews";
import Rating from "@/components/rate/rating";
import Genre from "@/components/genre/genre";
import SpinnerLoad from "@/components/loading/spinnerLoad";
require("dotenv").config();

const nunito = Nunito({
  weight: ["variable"],
  subsets: ["latin"],
});
const open_sans = Open_Sans({
  weight: ["variable"],
  subsets: ["latin"],
});

export default function StoryOverview({ params: { id } }) {
  const [theme, setTheme] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTheme = localStorage.getItem("theme");
      setTheme(storedTheme === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const router = useRouter();
  const storyName = decodeURIComponent(id);
  const [story, setStory] = useState({
    _id: "",
    storyBasic: { storyName: "" },
    genre: [],
    reviewId: [],
  });

  const [images, setImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("url()");
  const [descToggle, setDescToggle] = useState(true);
  const [showMore, setShowMore] = useState(false);

  // Extracting and filtering image URLs from Google Drive
  const imageURLS = images.map((image) => {
    const reducedURI = image.slice(0, -18);
    const id = reducedURI.split("/")[5];
    const string = "uc?export=view&id=";
    const url = `https://drive.google.com/${string}${id}`;
    return url;
  });

  // Setting background image
  useEffect(() => {
    if (imageURLS[0]) {
      setBackgroundImage(`url(${imageURLS[0]})`);
    }
  }, [imageURLS]);

  // Fetching story data
  useEffect(() => {
    const fetchStory = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stories/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storyName: storyName,
        }),
      });
      const data = await res.json();

      if (!data.status) {
        alert("Story not found");
        router.push("/stories");
        return;
      }
      setStory(data.story);
      setImages(data.dataURI);
      setLoading(false);
    };
    fetchStory();
  }, []);

  useEffect(() => {
    const description = document.getElementById("description");

    if (description && typeof window !== "undefined") {
      description.scrollHeight > description.clientHeight
        ? setShowMore(true)
        : setShowMore(false);
    }
  }, [story, typeof window !== "undefined"]);

  // Toggle description "read more" and "read less"
  function descriptionToggle() {
    const description = document.querySelector(`.${styles.description}`);
    description.classList.toggle(styles.description_full);
    setDescToggle(!descToggle);
  }

  // UseInView hook to determine if Chapters and Reviews are in view
  const [chaptersRef, chaptersInView] = useInView({
    triggerOnce: true,
  });

  const [reviewsRef, reviewsInView] = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <Navbar />
      {loading ? (
        <div className={styles.loading}>
          <SpinnerLoad />
          <FaBook size={80} className={styles.book} />
        </div>
      ) : (
        <>
          <div className={styles.all_overview_wrapper}>
            <div className={styles.left_overview_wrapper}>
              <Image
                alt="story image"
                src={imageURLS && imageURLS[0]}
                height={350}
                width={250}
                className={styles.story_image}
                title="This image is generated using AI"
              />
              <div className={styles.info_wrapper}>
                <h1 className={nunito.className}>
                  {story.storyBasic.storyName}
                </h1>
                <div className={styles.genre_wrapper}>
                  {story &&
                    story.genre.map((genre, i) => {
                      return <Genre genre={genre} index={i} key={i} />;
                    })}
                </div>
                <div className={styles.link}>
                  <Link href="#chapters">
                    <div className={styles.read_now}>Read Now</div>
                  </Link>
                </div>
                <p
                  id="description"
                  className={`${styles.description} ${open_sans.className}`}
                >
                  {story.storyDescription}
                </p>
                {showMore ? (
                  <div>
                    <span
                      className={styles.more_button}
                      onClick={() => descriptionToggle()}
                    >
                      {descToggle ? "+ Read More" : "- Read Less"}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.right_overview_wrapper}>
              <div className={styles.all_parameters_wrapper}>
                <div className={styles.parameter_value_wrapper}>
                  <div className={styles.parameters}>Status</div>
                  <div className={styles.values}>
                    {story.storyBasic.status ? "Ongoing" : "Completed"}
                  </div>
                </div>
                <div
                  className={`${styles.parameter_value_wrapper} ${styles.optional}`}
                >
                  <div className={styles.parameters}>Genre</div>
                  <div className={styles.values}>
                    {story.genre.map((genre, i) => {
                      return (
                        <span key={i}>
                          {genre}
                          {i < story.genre.length - 1 ? ", " : ""}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.parameter_value_wrapper}>
                  <div className={styles.parameters}>Views</div>
                  <div className={styles.values}>{story.views}</div>
                </div>
                <div className={styles.parameter_value_wrapper}>
                  <FaStar className={styles.star} />
                  <div className={styles.values}>
                    {story.noOfRatings == 0
                      ? "Not Rated Yet"
                      : (story.ratings / story.noOfRatings).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className={styles.ratings_wrapper}>
                {story._id && <Rating storyId={story._id} />}
              </div>
            </div>
          </div>
          <div
            ref={chaptersRef}
            id="chapters"
            className={styles.chapters_overview_wrapper}
          >
            {chaptersInView && story && story._id && (
              <Chapters id={story._id} story_name={storyName} />
            )}
          </div>
          <div ref={reviewsRef} id="reviews" className={styles.reviews_wrapper}>
            {reviewsInView && (
              <Reviews
                storyId={story._id}
                story_name={storyName}
                reviewId={story.reviewId}
              />
            )}
          </div>
          <Toaster theme={theme ? "dark" : "light"} position="bottom-left" />
        </>
      )}
    </>
  );
}
