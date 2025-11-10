import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Oops! Page Not Found</h2>
      <p className={styles.message}>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button onClick={() => navigate("/")} className={styles.btn}>
        Go Back Home
      </button>
    </section>
  );
};

export default PageNotFound;
