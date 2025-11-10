import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/forgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return alert("Please enter your email!");
    const data = await forgotPassword(email);
    console.log("Forgot Password Response:", data);
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Forgot Password</h2>
        <p className={styles.subtitle}>
          Enter your registered email to receive a password reset link.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className={styles.successBox}>
            <p>✅ A reset link has been sent to:</p>
            <strong>{email}</strong>
            <p className={styles.note}>
              Please check your inbox (and spam folder) to continue.
            </p>
          </div>
        )}

        <Link to="/login" className={styles.backLink}>
          ← Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
