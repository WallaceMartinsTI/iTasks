import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.home_link} to="/">
        <img src={Logo} alt="a" />
      </Link>

      <nav>
        <NavLink to="/">Tarefas</NavLink>
        <NavLink to="/">Nova Tarefa</NavLink>
        <NavLink to="/">Sair</NavLink>
      </nav>
    </header>
  );
};

export default Header;
