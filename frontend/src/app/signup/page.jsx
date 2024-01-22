"use client";
import styles from "./page.module.css";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!form.username || !form.email || !form.password) {
        alert("Please fill in all fields");
        return;
      }

      const res = await fetch(`${process.env.API_URL}user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (data.token) {
        const user = {
          token: data.token,
          id: data.id,
        };

        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }
        localStorage.setItem("user", JSON.stringify(user));

        setForm({ username: "", email: "", password: "" });

        router.push("/");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className={styles.signup_wrapper}>
      <div className={styles.signup_cover}>
        <h1>Sign Up</h1>
        <form>
          <label>
            <div>USERNAME</div>
            <input
              type="text"
              name="username"
              required
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
              value={form.username}
            />
          </label>
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
          <input type="submit" value="Sign Up" onClick={handleSubmit} />
        </form>
        <div className={styles.already_account_log_in}>
          <div>Already have an account?</div>
          <div>
            <Link href="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
