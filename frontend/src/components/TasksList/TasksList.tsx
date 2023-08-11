import { useState, useEffect } from "react";
import styles from "./TasksList.module.scss";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Tasks, AuthProps } from "../../context/UserContex";

const TasksList = () => {
  const hasStorage = localStorage.getItem("user_tasks") ? true : false;

  const [tasksList, setTasksList] = useState<Tasks[]>();
  const { userTasks }: AuthProps = useAuth();

  // if user with tasks press F5 will not show "no tasks" message
  useEffect(() => {
    if (userTasks!.length !== 0) {
      setTasksList(userTasks!);
      const savedData = JSON.stringify(userTasks);
      localStorage.setItem("user_tasks", savedData);
    }
  }, [userTasks]);

  const formatDate = (dateParam: string) => {
    const date = dateParam.split("-");
    return `${date[2]}/${date[1]}/${date[0]}`;
  };

  // CONTINUAR DAQUI DAR UPDATE NO COMPLETED DA TASK
  const handleChecked = (taskId: number) => {
    console.log(typeof taskId);
  };

  return (
    <section className={styles.main_container}>
      <section className={styles.tasks_container}>
        {tasksList &&
          tasksList.map((task) => (
            <section
              key={task.id}
              className={`${styles.task_container} ${
                task.completed ? styles.completed : ""
              }`}
            >
              <div className={styles.left}>
                <p className={styles.task_title}>{task.title}</p>
                <textarea
                  className={styles.task_description}
                  cols={70}
                  rows={5}
                  maxLength={500}
                  disabled
                  value={task.description}
                />
              </div>

              <div className={styles.right}>
                <div className={styles.start_date}>
                  <div>
                    <p>Data Início:</p>
                    <p>{formatDate(task.startDate)}</p>
                  </div>

                  <div>
                    <p>Data Final:</p>
                    <p>{formatDate(task.endDate)}</p>
                  </div>

                  <div>
                    <p>
                      <label className={styles.pointer} htmlFor="completed">
                        Concluída?
                      </label>
                    </p>
                    <p>
                      <input
                        className={styles.pointer}
                        type="checkbox"
                        name="completed"
                        id="completed"
                        defaultChecked={task.completed}
                        onChange={() => handleChecked(task.id)}
                      />
                    </p>
                  </div>
                </div>

                <div className={styles.buttons_container}>
                  <button className={styles.edit}>Editar</button>
                  <button className={styles.delete}>Deletar</button>
                </div>
              </div>
            </section>
          ))}
        {!hasStorage && (
          <p className={styles.no_tasks}>
            Você ainda não tem tarefas,{" "}
            <Link to="/createtask/">clique aqui</Link> para criar!
          </p>
        )}
      </section>
    </section>
  );
};

export default TasksList;
