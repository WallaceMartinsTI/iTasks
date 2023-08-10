import { useState, useEffect } from "react";
import styles from "./TasksList.module.scss";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Tasks, AuthProps } from "../../context/UserContex";

const TasksList = () => {
  const [tasksList, setTasksList] = useState<Tasks[]>([]);
  const { userTasks }: AuthProps = useAuth();
  console.log(userTasks);

  useEffect(() => {
    setTasksList(userTasks!);
  }, [userTasks]);

  const formatDate = (dateParam: string) => {
    const date = dateParam.split("-");
    return `${date[2]}/${date[1]}/${date[0]}`;
  };

  return (
    <section className={styles.main_container}>
      {tasksList.length === 0 ? (
        <p className={styles.no_tasks}>
          Você ainda não tem tarefas, <Link to="/createtask/">clique aqui</Link>{" "}
          para criar!
        </p>
      ) : (
        <section className={styles.tasks_container}>
          {tasksList.map((task) => (
            <section key={task.id} className={styles.task_container}>
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
        </section>
      )}
    </section>
  );
};

export default TasksList;
