// REACT
import { useState, useEffect, useRef } from "react";

// REACT ROUTER
import { Link } from "react-router-dom";

// CONTEXTS
import { Tasks, AuthProps } from "../../context/UserContex";

// HOOKS
import useAuth from "../../hooks/useAuth";

// COMPONENTS
import Form from "../Form/Form";

// CSS
import styles from "./TasksList.module.scss";

const TasksList = () => {
  const hasStorage = localStorage.getItem("user_tasks") ? true : false;

  const [tasksList, setTasksList] = useState<Tasks[]>();
  const {
    userTasks,
    isModalOpen,
    editTaskId,
    setIsModalOpen,
    setEditTaskId,
    deleteTask,
  }: AuthProps = useAuth();

  const modalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [editedTask, setEditedTask] = useState<Tasks[]>([]);

  const [modalType, setModalType] = useState("");
  const [taskToBeDeleted, setTaskToBeDeleted] = useState("");

  const [sortByCompleted, setSortByCompleted] = useState(false);

  const orderButtonRef = useRef<HTMLButtonElement>(null);
  const [ordered, setOrdenred] = useState(false);

  useEffect(() => {
    if (orderButtonRef.current) {
      if (ordered) {
        orderButtonRef.current!.style.backgroundColor = "#61dafb";
        orderButtonRef.current!.style.color = "#fff";
      } else {
        orderButtonRef.current!.style.backgroundColor = "transparent";
        orderButtonRef.current!.style.color = "#000";
      }
    }
  }, [ordered]);

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

  const handleEditTask = (taskId: string) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setModalType("EDIT");
    setIsModalOpen!(true);
    setEditTaskId!(taskId);

    const editingTask = tasksList!.filter((task) => task.id == taskId);

    setEditedTask(editingTask);
  };

  const openDeleteModal = (taskId: string) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setModalType("DELETE");
    setIsModalOpen!(true);
    setEditTaskId!(taskId);
  };

  const cancelDelete = () => {
    setIsModalOpen!(false);
    return;
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask!(taskId);
    setIsModalOpen!(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      bodyRef.current!.style.filter = "blur(5px)";
      modalRef.current!.style.display = "flex";
    } else {
      hideModal();
    }
  }, [isModalOpen]);

  const hideModal = () => {
    setIsModalOpen!(false);
    bodyRef.current!.style.filter = "none";
    modalRef.current!.style.display = "none";
  };

  return (
    <section className={styles.main_container}>
      <div
        onMouseLeave={hideModal}
        ref={modalRef}
        className={styles.modal_container}
      >
        {modalType === "EDIT" ? (
          <Form
            titleField={true}
            descriptionField={true}
            startDateField={true}
            endDateField={true}
            completedField={true}
            btnText="Atualizar"
            formType="UPDATETASK"
            formTitle="Atualizar Tarefa"
            formSubtitle="Faça suas alterações e clique em salvar!"
            editedTask={editedTask}
            hideModal={hideModal}
            clearBtn={false}
          />
        ) : (
          <div>
            <h1>
              Você deseja realmente deletar a seguinte tarefa: <br />"
              {taskToBeDeleted}" ?
            </h1>
            <div className={styles.handle_delete_buttons}>
              <button className={styles.no} onClick={cancelDelete}>
                NÃO
              </button>
              <button
                className={styles.yes}
                onClick={() => handleDeleteTask(editTaskId!)}
              >
                SIM
              </button>
            </div>
          </div>
        )}
      </div>

      <section ref={bodyRef} className={styles.tasks_container}>
        {tasksList && (
          <>
            <button
              ref={orderButtonRef}
              className={styles.order_button}
              onClick={() => [
                setSortByCompleted(!sortByCompleted),
                setOrdenred(!ordered),
              ]}
            >
              Ordenar por Concluídas
            </button>
          </>
        )}

        {tasksList &&
          tasksList
            .slice()
            .sort((a) => {
              if (sortByCompleted) {
                return a.completed ? 1 : -1;
              }
              return 0;
            })
            .map((task) => (
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
                        <label htmlFor="completed">Concluída?</label>
                      </p>
                      <p>
                        <input
                          type="checkbox"
                          name="completed"
                          id="completed"
                          defaultChecked={task.completed}
                          disabled
                        />
                      </p>
                    </div>
                  </div>

                  <div className={styles.buttons_container}>
                    <button
                      className={styles.edit}
                      onClick={() => handleEditTask(task.id)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.delete}
                      onClick={() => [
                        openDeleteModal(task.id),
                        setTaskToBeDeleted(task.title),
                      ]}
                    >
                      Deletar
                    </button>
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
