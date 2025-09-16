"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

import PersonIcon from "@mui/icons-material/Person";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "./logIn.module.scss";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validUser = "uztash2267B-Spaceship";
    const validPass = "ewtq2";

    if (username === validUser && password === validPass) {
      login(); 
      router.push("/profile");
    } else {
      setError("Invalid username or password ❌");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBg}></div>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1 className={styles.loginTitle}>Login</h1>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <PersonIcon />
        </div>

        <div className={styles.inputGroup}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showPassword ? (
            <VisibilityOffIcon
              onClick={() => setShowPassword(false)}
              className={styles.iconClick}
            />
          ) : (
            <VisibilityIcon
              onClick={() => setShowPassword(true)}
              className={styles.iconClick}
            />
          )}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.loginBtn}>
          Login
        </button>
      </form>
    </div>
  );
}
