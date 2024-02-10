"use client";
import styles from "./page.module.css";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTheme = localStorage.getItem("theme");
      setTheme(storedTheme === "true");
    };

    // Attach event listener for changes in localStorage
    window.addEventListener("storage", handleStorageChange);

    // Initial setup
    handleStorageChange();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [localStorage]); // Include localStorage in the dependency array

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

      const res = await fetch(`${process.env.API_URL}user/resetpassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: form.password,
          id: JSON.parse(localStorage.getItem("user")).id,
        }),
      });

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

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.fpass === false) {
    router.push("/");
  } else {
    user.fpass = false;
    return (
      <div className={styles.wrapper}>
        <div className={styles.cover}>
          <h1>Reset Password</h1>
          <form>
            <label>
              <div>NEW PASSWORD</div>
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
              <div>CONFIRM PASSWORD</div>
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
}
