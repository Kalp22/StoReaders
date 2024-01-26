"use client";
import styles from "./page.module.css";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const [form1, setForm1] = useState({ email: "" });
  const [form2, setForm2] = useState({ otp: "" });

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

  async function emailSubmit(e) {
    try {
      e.preventDefault();

      if (!form1.email) {
        alert("Please enter the email");
        return;
      }

      const res = await fetch(`${process.env.API_URL}user/sendotp`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form1.email,
        }),
      });

      const data = await res.json();

      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }

      if (data.status) {
        setIsConfirmed(true);
      }
    } catch (e) {
      console.log("error");
    }
  }

  async function otpSubmit(e) {
    e.preventDefault();

    if (!form2.otp) {
      alert("Please enter the OTP");
      return;
    }

    console.log(form1.email);

    const res = await fetch(`${process.env.API_URL}user/checkotp`, {
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

    if (data.status) {
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
          <h1 className={styles.name}>Forgot Password</h1>
          <form className={styles.form}>
            <label>
              <div>EMAIL ADDRESS</div>
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
          <h1 className={styles.name}>Enter OTP</h1>
          <form className={styles.form}>
            <label>
              <div>Enter OTP</div>
              <input
                type="number"
                name="OTP"
                required
                onChange={(e) => setForm2({ ...form2, otp: e.target.value })}
                value={form2.otp}
              />
            </label>
            <input type="submit" value="Check" onClick={otpSubmit} />
          </form>
        </div>
      </div>
    </div>
  );
}
