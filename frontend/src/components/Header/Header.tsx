import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import { AuthProps } from "../../context/UserContex";

const Header = () => {
  const { signed, signout }: AuthProps = useAuth();

  return (
    <header className={styles.header}>
      <Link className={styles.home_link} to="/">
        <img src={Logo} alt="iTasks Logo" />
      </Link>

      <nav>
        {signed ? (
          <>
            <NavLink to="/">Tarefas</NavLink>
            <NavLink to="/createtask/">Nova Tarefa</NavLink>

            <button onClick={signout}>Sair</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registrar</NavLink>
            <NavLink to="/">Sobre</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
