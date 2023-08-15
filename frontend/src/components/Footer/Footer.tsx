// REACT ROUTER
import { Link } from "react-router-dom";

// CSS
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/">iTasks &copy; WCSM | 2023</Link>
    </footer>
  );
};

export default Footer;
