"use client";
import styles from "./page.module.css";

import { Nunito } from "next/font/google";
import { Baskervville } from "next/font/google";
import { Quicksand } from "next/font/google";

import Comments from "@/components/comments/comments";
import SpinnerLoad from "@/components/loading/spinnerLoad";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Toaster } from "sonner";
import { FaBook } from "react-icons/fa6";
require("dotenv").config();

const nunito = Nunito({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
const baskervville = Baskervville({ weight: ["400"], subsets: ["latin"] });
const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function chapterRead({ params: { id, chapterName } }) {
  const router = useRouter();

  const storyName = id.replace(/-/g, " ");
  const chapter_name = chapterName.replace(/-/g, " ");

  const [user, setUser] = useState({});
  const [chapter, setChapter] = useState({
    _id: "",
    storyId: "",
    storyName: "",
    chapterNumber: "",
    commentId: [],
  });
  const [theme, setTheme] = useState(true);
  const [loading, setLoading] = useState(true);

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
  }, [chapter]);

  return (
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
                Chapter Number {chapter.chapterNumber && chapter.chapterNumber}{" "}
                :
              </span>
              <span className={quicksand.className}>{chapter_name}</span>
            </div>
            <div className={`${styles.content} ${baskervville.className}`}>
              {chapter.chapterContent &&
                chapter.chapterContent.split("\n").map((para, i) => {
                  return (
                    <p key={i} className={styles.paragraph}>
                      {para}
                    </p>
                  );
                })}{" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
              impedit sequi dolore repudiandae atque temporibus eligendi iusto
              possimus? Unde animi beatae ea tempore eaque aliquid commodi
              incidunt natus expedita odio iste a eligendi error veritatis
              temporibus cumque perspiciatis libero ut, adipisci, ad itaque
              alias consequuntur nam? Esse facilis consequuntur quas nemo
              perferendis sapiente excepturi placeat ipsum eveniet tenetur
              similique a eos odio quia, id numquam. Asperiores quos amet
              tempore esse optio ab. Fugit veritatis voluptate voluptatibus?
              Corporis porro deserunt possimus impedit, totam optio minus
              exercitationem voluptatibus? Cum reprehenderit, consequuntur at
              sapiente cupiditate perspiciatis odio inventore doloremque
              temporibus, suscipit magnam optio ut, quos assumenda magni? Quo
              aliquam dignissimos dolor autem incidunt aperiam veniam neque,
              quos adipisci quibusdam, repudiandae nostrum suscipit at fugiat?
              Eligendi eum consequatur, recusandae provident quod ducimus
              maiores molestias obcaecati eveniet quas earum totam ab? Ullam
              temporibus perspiciatis amet rem labore mollitia, accusantium
              tenetur soluta laborum consectetur voluptas quisquam quod
              distinctio sit? Commodi molestiae beatae autem eveniet fugit
              porro, fuga dicta asperiores est repellendus sint nisi possimus
              neque rem odit soluta vitae! Vero suscipit enim ipsa repellendus
              magni. Aut repellat maiores cupiditate distinctio ducimus
              excepturi consequuntur natus omnis reprehenderit quis. Asperiores,
              pariatur. Error nulla quisquam tenetur eum? Illo, asperiores?
            </div>
          </div>
          <Comments chapterId={chapter._id} commentIds={chapter.commentId} />
        </>
      )}
      <Toaster theme={theme ? "dark" : "light"} position="bottom-left" />
    </div>
  );
}
