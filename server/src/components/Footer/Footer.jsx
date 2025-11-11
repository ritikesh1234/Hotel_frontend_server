import React from "react";
import styles from './Footer.module.css';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>

        {/* Brand Section */}
        <div className={styles.footerSection}>
          <div className={styles.brand}>
            <img src={logo} alt="Stayio" className={styles.logo} />
            <h2 className={styles.brandName}>Stayio</h2>
          </div>
          <p className={styles.tagline}>
            Find the perfect stay in any city — comfort, luxury, and convenience all in one place.
          </p>
          <div className={styles.socialIcons}>
            <Link to="#"><Facebook size={20} /></Link>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Company Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Company</h3>
          <ul className={styles.linkList}>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Blog</Link></li>
            <li><Link to="#">Press</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Support</h3>
          <ul className={styles.linkList}>
            <li><Link to="/help-center">Help Center</Link></li>
            <li><Link to="/cancellation-options">Cancellation Options</Link></li>
            <li><Link to="#">Neighborhood Support</Link></li>
            <li><Link to="#">Trust & Safety</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Contact</h3>
          <ul className={styles.contactList}>
            <li><Mail size={18} className={styles.icon} /> support@stayio.com</li>
            <li><Phone size={18} className={styles.icon} /> +91 98765 43210</li>
            <li><MapPin size={18} className={styles.icon} /> Indore, Madhya Pradesh</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.footerBottom}>
        © {new Date().getFullYear()} Stayio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
