import React from "react";
import { Routes, Route, BrowserRouter as Router  } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Hotels from "../pages/Hotels/Hotels";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import BecomeHost from "../pages/BecomeHost/BecomeHost";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Profile from "../components/Profile/Profile.jsx";
import AboutUs from "../pages/AboutUs/AboutUs.jsx";
import Layout from "../Layout.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/become-host" element={<BecomeHost />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="*" element={<PageNotFound />} />
        </Route >
      </Routes>
    </Router>
  );
};

export default AppRoutes;
