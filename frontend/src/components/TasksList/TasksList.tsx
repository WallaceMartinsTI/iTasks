import { useState, useEffect } from "react";
import styles from "./TasksList.module.scss";
import { Link } from "react-router-dom";

interface ITraskProps {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  ownerId: string;
}

const TasksList = () => {
  const [tasksList, setTasksList] = useState([]);

  return (
    <section>
      {tasksList ? (
        <p className={styles.no_tasks}>
          Você ainda não tem tarefas, <Link to="/createtask/">clique aqui</Link>{" "}
          para criar!
        </p>
      ) : (
        <p>Não tem tarefas</p>
      )}
    </section>
  );
};

export default TasksList;
