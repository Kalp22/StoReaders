"use client";
import styles from "./page.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster, toast } from "sonner";

export default function Login() {
  const router = useRouter();
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

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!form.email || !form.password) {
        toast.warning("Please fill in all fields");
        return;
      }

      const res = await fetch(`${process.env.API_URL}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (data.token) {
        toast.success("Logged in successfully");
        const user = {
          token: data.token,
          id: data.id,
          username: data.username,
          email: form.email,
          rating: data.ratings,
        };

        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }

        localStorage.setItem("user", JSON.stringify(user));

        setForm({ email: "", password: "" });

        router.push("/");
      } else {
        toast.error(data.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_cover}>
        <h1>Log In</h1>
        <form>
          <label>
            <div>EMAIL ADDRESS</div>
            <input
              type="email"
              name="email"
              required
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              value={form.email}
            />
          </label>
          <label>
            <div>PASSWORD</div>
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
          <div className={styles.forget_password}>
            <Link href="/forgot_password">Forgot password?</Link>
          </div>
          <input type="submit" value="Log In" onClick={handleSubmit} />
        </form>
        <div className={styles.no_account_sign_up}>
          <div>Don't have an account?</div>
          <div>
            <Link href="/signup">Sign up</Link>
          </div>
        </div>
      </div>
      <Toaster theme={theme ? "dark" : "light"} position="bottom-left" />
    </div>
  );
}
