"use client";

import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // TODO: Add a password reset feature, and a "forgot password" link, and a "resend verification email" link, and a "change email" link, and a "change username" link
  // TODO: Add a "delete account" button,
  // TODO: Create API endpoints for all of the above and test handleLogin function.

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Check if the password is valid before sending it to the server
    if (!checkPassword()) {
      setMessage("Password is not valid. It must meet certain criteria.");
      return;
    }

    try {
      const apiUrl = isLoginMode ? "/api/login" : "/api/create-account";
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }), // Include username in the request
      });

      const data = await res.json();

      if (res.status === 200) {
        // Successfully logged in or created an account
        setMessage(isLoginMode ? "Logged in" : "Account created");
        router.push("/folders");
      } else {
        // Error message from the server
        setMessage(data.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  const checkPassword = () => {
    // Check for minimum length
    if (password.length < 8 || password.length > 64) {
      return false;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Check for at least one digit
    if (!/[0-9]/.test(password)) {
      return false;
    }

    // Check for at least one special character
    if (!/[!@#$%^&*]/.test(password)) {
      return false;
    }

    return true;
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleLogin}>
        {!isLoginMode && ( // Only show email input when creating an account
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
        )}
        <div className={styles.formGroup}>
          <label className={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          {isLoginMode ? "Login" : "Create Account"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <div className={styles.smallText}>
        {isLoginMode ? (
          <>
            Don't have an account?{" "}
            <span onClick={() => setIsLoginMode(false)}>Create one</span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span onClick={() => setIsLoginMode(true)}>Login</span>
          </>
        )}
      </div>
    </div>
  );
}
