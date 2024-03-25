"use client";
import styles from "./page.module.css";

import { Raleway } from "next/font/google";
import { Quicksand } from "next/font/google";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const [form1, setForm1] = useState({ email: "" });
  const [form2, setForm2] = useState({ otp: "" });
  const [theme, setTheme] = useState(true);
  const [timer, setTimer] = useState(60);

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

  useEffect(() => {
    if (isConfirmed) {
      const mailForm = document.getElementById("mailGetter");
      const otpForm = document.getElementById("otpGetter");

      mailForm.classList.remove(styles.show);
      mailForm.classList.add(styles.hide);

      otpForm.classList.remove(styles.hide);
      otpForm.classList.add(styles.show);
    }
  }, [isConfirmed]);

  useEffect(() => {
    let interval;
    if (isConfirmed) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isConfirmed]);

  useEffect(() => {
    if (timer === 0) {
      // Timer is up, redirect to the home page or handle as needed
      toast.error("Time's up! Please try again");
      const interval = setInterval(() => {
        clearInterval(interval);
        router.push("/");
      }, 2000);
    }
  }, [timer]);

  async function emailSubmit(e) {
    try {
      e.preventDefault();

      if (!form1.email) {
        toast.warning("Please enter your email address");
        return;
      }

      if (!(form1.email.includes("@") && form1.email.includes("."))) {
        toast.warning("Please enter a valid email address");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}user/sendotp`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form1.email,
          }),
        }
      );

      const data = await res.json();

      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }

      if (!data.status) {
        toast.error(data.msg);
        return;
      }

      if (data.status) {
        toast.success("OTP sent successfully");
        setIsConfirmed(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async function otpSubmit(e) {
    e.preventDefault();

    if (!form2.otp) {
      toast.warning("Please enter the OTP");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/checkotp`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: form2.otp,
        email: form1.email,
      }),
    });

    const data = await res.json();

    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }

    setForm2({ otp: "" });

    if (!data.status) {
      toast.error(data.msg);
      return;
    }

    if (data.status) {
      toast.success("OTP verified successfully");
      const user = {
        id: data.id,
        fpass: true,
      };
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/reset_password");
    }
  }

  return (
    <div className={styles.forgot_pass_wrapper}>
      <div className={styles.forgot_pass_cover}>
        <div className={styles.show} id="mailGetter">
          <h1 className={`${styles.name} ${raleway.className}`}>
            Forgot Password
          </h1>
          <form className={styles.form}>
            <label>
              <div className={quicksand.className}>EMAIL ADDRESS</div>
              <input
                type="email"
                name="email"
                required
                onChange={(e) => setForm1({ ...form1, email: e.target.value })}
                value={form1.email}
              />
            </label>
            <input type="submit" value="Send OTP" onClick={emailSubmit} />
          </form>
        </div>

        <div className={styles.hide} id="otpGetter">
          <h1 className={`${styles.name} ${raleway.className}`}>Enter OTP</h1>
          <form className={styles.form}>
            <label>
              <div className={quicksand.className}>Enter OTP</div>
              <input
                className={styles.otp_input}
                type="number"
                name="OTP"
                required
                onChange={(e) => setForm2({ ...form2, otp: e.target.value })}
                value={form2.otp}
              />
            </label>
            <input type="submit" value="Check" onClick={otpSubmit} />
            {isConfirmed && (
              <p className={styles.timer}>{`Enter OTP in ${timer} seconds`}</p>
            )}
          </form>
        </div>
      </div>
      <Toaster theme={theme ? "dark" : "light"} position="bottom-left" />
    </div>
  );
}
