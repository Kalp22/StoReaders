import styles from "./dashboardRight.module.css";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { IoCloseOutline } from "react-icons/io5";
require("dotenv").config();

export default function DashboardRight() {
  const router = useRouter();
  const [latestStoryName, setLatestStoryName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getLatestStory = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}stories/getLatest`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        setLatestStoryName(data.storyName);
        setLoading(false);
      };
      getLatestStory();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteAccount = async () => {
    try {
      if (!email) {
        toast.error("Please enter your email to confirm");
        return;
      }
      if (email !== JSON.parse(localStorage.getItem("user")).email) {
        toast.error("Email does not match");
        setEmail("");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify({
          _id: JSON.parse(localStorage.getItem("user")).id,
        }),
      });

      const data = await res.json();

      if (!data.status) {
        toast.error(data.msg);
        return;
      }

      toast.success(data.msg);
      document.getElementById("dialog").close();
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const settingsToggle = () => {
    const settingsList = document.querySelector(`.${styles.settings_wrapper}`);
    settingsList.classList.toggle(`${styles.settings_wrapper_open}`);
  };

  return (
    <>
      <div className={styles.options_wrapper}>
        <Link
          href={`/story/${latestStoryName.replace(/\s/g, "-")}`}
          className={styles.latest_chapter}
        >
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              <p>Latest Story</p>
              <p>{latestStoryName}</p>
            </>
          )}
        </Link>
        <div className={styles.line}></div>
        <div className={styles.options_cover}>
          <Link href={"/stories"} className={styles.keep_reading}>
            <div>Keep Reading</div>
          </Link>
          <div className={styles.settings} onClick={() => settingsToggle()}>
            Account Settings
          </div>
          <div className={styles.settings_wrapper}>
            <ul className={styles.settings_list}>
              <li
                onClick={() => {
                  router.push("/");
                  localStorage.removeItem("user");
                }}
              >
                Log Out
              </li>
              <li
                onClick={() => {
                  document.getElementById("dialog").showModal();
                }}
              >
                Delete Account
              </li>
            </ul>
          </div>
        </div>
      </div>
      <dialog id="dialog" className={styles.ask_dialog}>
        <div className={styles.ask_dialog_box}>
          <IoCloseOutline
            className={styles.close}
            size={32}
            onClick={() => document.getElementById("dialog").close()}
          />
          <p>Are you sure you want to Delete your account?</p>
          <div>
            <p>Enter your Email to confirm</p>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter your Email To confirm"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
          </div>
          <span>(Double Click to Delete)</span>
          <div className={styles.ask_dialog_buttons}>
            <button onDoubleClick={deleteAccount}>Yes</button>
            <button
              onClick={() => {
                document.getElementById("dialog").close();
              }}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
