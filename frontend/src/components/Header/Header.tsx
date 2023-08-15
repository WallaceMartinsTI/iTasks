// REACT ROUTER
import { NavLink, Link } from "react-router-dom";

// CONTEXTS
import { AuthProps } from "../../context/UserContex";

// HOOKS
import useAuth from "../../hooks/useAuth";

// ASSETS
import Logo from "../../assets/logo.png";

// CSS
import styles from "./Header.module.scss";

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
            <NavLink to="/about">Sobre</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
