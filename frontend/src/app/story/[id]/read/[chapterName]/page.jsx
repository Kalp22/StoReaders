"use client";
import styles from "./page.module.css";

import { Nunito } from "next/font/google";
import { Quicksand } from "next/font/google";
import { Baskervville } from "next/font/google";
import { Noto_Serif_Georgian } from "next/font/google";
import { Roboto } from "next/font/google";
import { Lora } from "next/font/google";
import { Open_Sans } from "next/font/google";

import Comments from "@/components/comments/comments";
import SpinnerLoad from "@/components/loading/spinnerLoad";
import DarkLight from "@/components/ui/darklight/page";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { Toaster } from "sonner";
import { FaBook } from "react-icons/fa6";
require("dotenv").config();

const nunito = Nunito({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
const baskervville = Baskervville({ weight: ["400"], subsets: ["latin"] });
const notoSerifGeorgian = Noto_Serif_Georgian({
  weight: ["100", "200", "300", "400", "700"],
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});
const lora = Lora({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const openSans = Open_Sans({
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

export default function ChapterRead({ params: { id, chapterName } }) {
  const router = useRouter();

  const storyName = decodeURIComponent(id);
  const chapter_name = decodeURIComponent(chapterName);

  const [user, setUser] = useState({});
  const [chapter, setChapter] = useState({
    _id: "",
    storyId: "",
    storyName: "",
    chapterNumber: "",
    commentId: [],
  });

  const [isActive, setIsActive] = useState(true);
  const idleTimer = useRef(null);

  const getInitialFontSize = (initial) => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("fontSize") && initial)
        return parseFloat(localStorage.getItem("fontSize"));
      // Check if window is defined to ensure it's executed on the client side

      const width = window.innerWidth;
      if (width < 600) return 1.0;
      if (width < 800) return 1.2;
      return 1.4;
    }
    return 1.4; // Default value if window is undefined
  };

  const getInitialFontStyle = () => {
    if (typeof window !== "undefined" && localStorage.getItem("fontStyle"))
      return localStorage.getItem("fontStyle");
    return "baskervville"; // Default value if no font style is saved
  };

  const [fontSize, setFontSize] = useState(getInitialFontSize(true));
  const [theme, setTheme] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fontStyle, setFontStyle] = useState(getInitialFontStyle()); // Default font style

  useEffect(() => {
    // Check if window is defined to ensure it's executed on the client side
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      // Check if window is defined to ensure it's executed on the client side
      if (typeof window !== "undefined") {
        const storedTheme = localStorage.getItem("theme");
        setTheme(storedTheme === "true");
      }
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
    const getChapter = async () => {
      // Check if window is defined to ensure it's executed on the client side
      if (typeof window !== "undefined") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}chapters/getOne`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user ? user.id : null,
                chapterName: chapter_name,
              }),
            }
          );
          const data = await res.json();
          if (data.chapter == null) {
            router.push(`/story/${id}`);
          }
          if (data.chapter.storyName != storyName) {
            router.push(`/story/${id}`);
          }
          setLoading(false);
          setChapter(data.chapter);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    getChapter();
  }, [chapter_name, storyName, user?.id]); // Only run when chapter_name, storyName, or user.id changes

  const handleFontSize = (size) => () => {
    setFontSize((prevFontSize) => {
      let newFontSize = prevFontSize; // Initialize with previous font size

      if (size === 1 && prevFontSize > 0.8) {
        newFontSize = prevFontSize - 0.2;
      } else if (size === 2) {
        newFontSize = getInitialFontSize(false);
      } else if (size === 3 && prevFontSize < 3) {
        newFontSize = prevFontSize + 0.2;
      }

      localStorage.setItem("fontSize", newFontSize); // Save font size in local storage

      return newFontSize; // Return the new font size
    });
  };

  // Function to handle font style change
  const handleFontStyle = (event) => {
    const selectedFontStyle = event.target.value;
    setFontStyle(selectedFontStyle);
    localStorage.setItem("fontStyle", selectedFontStyle); // Save font style in local storage
  };

  const handleUserActivity = () => {
    setIsActive(true);

    // Clear the existing timer
    clearTimeout(idleTimer.current);

    // Set a new timer to set isActive to false after 2 seconds of inactivity
    idleTimer.current = setTimeout(() => {
      setIsActive(false);
    }, 2000);
  };

  useEffect(() => {
    // List of events that signify user activity
    const events = ["mousemove", "scroll", "keydown", "click"];

    // Attach event listeners to each event
    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    // Clean up event listeners on component unmount
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <>
      <div className={`${styles.quick_settings} ${!isActive && styles.hidden}`}>
        <DarkLight />
        <div className={styles.font_size}>
          <div className={styles.font_size_btn1} onClick={handleFontSize(1)}>
            -
          </div>
          <div className={styles.font_size_btn2} onClick={handleFontSize(2)}>
            A
          </div>
          <div className={styles.font_size_btn3} onClick={handleFontSize(3)}>
            +
          </div>
        </div>
        <div className={styles.font_style}>
          <select
            id="fontStyleSelect"
            className={styles.font_style_dropdown}
            value={fontStyle}
            onChange={handleFontStyle}
          >
            <option value="baskervville">Baskerville</option>
            <option value="notoSerifGeorgian">Georgia</option>
            <option value="roboto">Roboto</option>
            <option value="lora">Lora</option>
            <option value="openSans">Open Sans</option>
          </select>
        </div>
      </div>
      <div className={styles.read_container}>
        {loading ? (
          <div className={styles.loading}>
            <SpinnerLoad />
            <FaBook size={80} className={styles.book} />
          </div>
        ) : (
          <>
            <div className={styles.read_wrapper}>
              <p className={`${styles.story_name} ${nunito.className}`}>
                {chapter.storyName}
              </p>
              <div className={styles.chapter_info}>
                <span>
                  Chapter Number{" "}
                  {chapter.chapterNumber && chapter.chapterNumber} :
                </span>
                <span className={quicksand.className}>{chapter_name}</span>
              </div>
              <div
                className={`${styles.content} ${
                  fontStyle === "baskervville"
                    ? baskervville.className
                    : fontStyle === "notoSerifGeorgian"
                    ? notoSerifGeorgian.className
                    : fontStyle === "merriweather"
                    ? merriweather.className
                    : fontStyle === "lora"
                    ? lora.className
                    : fontStyle === "openSans"
                    ? openSans.className
                    : ""
                }`}
                style={{
                  fontSize: `${fontSize}rem`,
                }}
              >
                {chapter.chapterContent &&
                  chapter.chapterContent.split("\n").map((para, i) => {
                    return (
                      <p key={i} className={styles.paragraph}>
                        {para}
                      </p>
                    );
                  })}
              </div>
            </div>
            <Comments chapterId={chapter._id} commentIds={chapter.commentId} />
          </>
        )}
        <Toaster theme={theme ? "dark" : "light"} position="bottom-left" />
      </div>
    </>
  );
}
