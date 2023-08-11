import { Link } from "react-router-dom";
import TasksList from "../../components/TasksList/TasksList";
import styles from "./Home.module.scss";
import useAuth from "../../hooks/useAuth";
import { AuthProps } from "../../context/UserContex";

const Home = () => {
  const { signed, isLoading }: AuthProps = useAuth();

  return (
    <div className={styles.home}>
      {!signed ? (
        <p>
          <Link to="/register">Registre-se</Link> ou faça{" "}
          <Link to="/login">Login</Link> para começar a salvar suas tarefas!
        </p>
      ) : (
        <>
          {isLoading ? (
            <div className={styles.loading_container}>
              <div className={styles.loading}></div>
              <p className={styles.wait_text}>Carregando, aguarde...</p>
            </div>
          ) : (
            <TasksList />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
