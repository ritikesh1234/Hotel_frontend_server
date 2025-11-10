import React, { useState } from "react";
import styles from "./Login.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { login } from "../../api/login";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { type, value } = e.target;
    if (type === "email") setEmail(value);
    else if (type === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      dispatch(loginSuccess(data));
      console.log("Login Response:", data);
      navigate("/");
      // Save token or navigate to dashboard
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome Back to Stayio</h2>
        <p className={styles.subtitle}>Login to manage your bookings</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input
              onChange={handleChange}
              value={email}
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input
              onChange={handleChange}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.remember}>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className={styles.forgot}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className={styles.btnLogin}>
            Login
          </button>
        </form>

        <p className={styles.signupText}>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
