import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/">iTasks &copy; WCSM | 2023</Link>
    </footer>
  );
};

export default Footer;
