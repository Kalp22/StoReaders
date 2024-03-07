"use client";
import styles from "./page.module.css";

import { Raleway } from "next/font/google";
import { Quicksand } from "next/font/google";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
require("dotenv").config();

const raleway = Raleway({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
});
const quicksand = Quicksand({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function ResetPasswordPage() {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!form.password || !form.confirmPassword) {
        toast.warning("Please fill in all fields");
        return;
      }

      if (form.password !== form.confirmPassword) {
        toast.warning("Passwords do not match");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.error("User not found");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}user/resetpassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: form.password,
            id: user.id,
          }),
        }
      );

      const data = await res.json();

      if (data.status) {
        toast.success("Password reset successfully");
        setForm({ password: "", confirmPassword: "" });
        localStorage.removeItem("user");
        router.push("/login");
      } else {
        toast.error(data.msg);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).fpass
    ) {
      setUser(JSON.parse(localStorage.getItem("user")));
      user.fpass = false;
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cover}>
        <h1 className={raleway.className}>Reset Password</h1>
        <form>
          <label>
            <div className={quicksand.className}>NEW PASSWORD</div>
            <input
              type="password"
              name="password"
              required
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              value={form.password}
            />
          </label>
          <label>
            <div className={quicksand.className}>CONFIRM PASSWORD</div>
            <input
              type="password"
              name="password"
              required
              onChange={(e) => {
                setForm({ ...form, confirmPassword: e.target.value });
              }}
              value={form.confirmPassword}
            />
          </label>
          <input type="submit" value="Reset" onClick={handleSubmit} />
        </form>
      </div>
      <Toaster theme={theme ? "dark" : "light"} position="bottom-left" />
    </div>
  );
}
