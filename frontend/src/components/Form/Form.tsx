// REACT
import { useState, FormEvent, useEffect } from "react";

// REACT ROUTER
import { useNavigate, Link } from "react-router-dom";

// CONTEXTS
import { AuthProps, Tasks } from "../../context/UserContex";

// HOOKS
import useAuth from "../../hooks/useAuth";

// CSS
import styles from "./Form.module.scss";

interface IFormProps {
  usernameField?: boolean;
  emailField?: boolean;
  passwordField?: boolean;
  confirmPasswordField?: boolean;
  titleField?: boolean;
  descriptionField?: boolean;
  startDateField?: boolean;
  endDateField?: boolean;
  completedField?: boolean;
  clearBtn?: boolean;
  btnText: string;
  formType: "REGISTER" | "LOGIN" | "ADDTRASK" | "UPDATETASK";
  formTitle: string;
  formSubtitle: string;
  editedTask?: Tasks[];
  hideModal?: () => void;
}

interface ITraskProps {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  owner: string | null;
}

const Form = ({
  usernameField,
  emailField,
  passwordField,
  confirmPasswordField,
  titleField,
  descriptionField,
  startDateField,
  endDateField,
  completedField,
  clearBtn = true,
  btnText,
  formType,
  formTitle,
  formSubtitle,
  editedTask,
  hideModal,
}: IFormProps) => {
  function getFormattedAndFutureDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Adiciona zero à esquerda, se necessário
    const day = today.getDate().toString().padStart(2, "0"); // Adiciona zero à esquerda, se necessário

    const formattedDate = `${year}-${month}-${day}`;

    // Calcula a data daqui a 5 anos
    const futureDate = new Date(today);
    futureDate.setFullYear(year + 5);
    const futureYear = futureDate.getFullYear();
    const futureMonth = (futureDate.getMonth() + 1).toString().padStart(2, "0");
    const futureDay = futureDate.getDate().toString().padStart(2, "0");
    const formattedFutureDate = `${futureYear}-${futureMonth}-${futureDay}`;

    return {
      formattedDate: formattedDate, // Data de hoje formatada: "2023-08-31"
      formattedFutureDate: formattedFutureDate, // Data daqui a 5 anos formatada: "2028-08-31"
    };
  }
  const dates = getFormattedAndFutureDate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(dates.formattedDate);
  const [endDate, setEndDate] = useState<string>(dates.formattedDate);
  const [completed, setCompleted] = useState<boolean>(false);

  const [cancelSubmit, setCancelSubmit] = useState(false);

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const { signup, signin, addTask, updateTask, editTaskId }: AuthProps =
    useAuth();

  const userId = localStorage.getItem("user_id");

  const generateTaskId = () => {
    return Math.floor(Math.random() * 10000) + 1;
  };

  useEffect(() => {
    if (editedTask && editedTask!.length > 0) {
      setTitle(editedTask[0].title);
      setDescription(editedTask[0].description);
      setStartDate(editedTask[0].startDate);
      setEndDate(editedTask[0].endDate);
      setCompleted(editedTask[0].completed);
    }
  }, [editedTask]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cancelSubmit) {
      hideModal!();
      return;
    }

    if (formType === "REGISTER") {
      if (!username || !email || !password || !confirmPassword) {
        setError("Preencha todos os campos");
        return;
      } else if (password !== confirmPassword) {
        setError("As senhas não sãos iguais");
        return;
      }
      const res = signup!({ username, email, password });

      if (res) {
        setError(res);
        return;
      }

      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } else if (formType === "LOGIN") {
      if (!email || !password) {
        setError("Preencha todos os campos");
        return;
      }

      const res = signin!({ email, password });

      if (res) {
        setError(res);
        return;
      }

      navigate("/");
    } else if (formType === "ADDTRASK") {
      if (!title || !description || !startDate || !endDate) {
        setError("Preencha todos os campos");
        return;
      }

      const newTask: ITraskProps = {
        id: generateTaskId(),
        title,
        description,
        startDate,
        endDate,
        completed,
        owner: userId,
      };

      const data = JSON.stringify(newTask);

      addTask!(data);
      navigate("/");
    } else if (formType === "UPDATETASK") {
      if (!title || !description || !startDate || !endDate) {
        setError("Preencha todos os campos");
        return;
      }

      const updatedTask = {
        title,
        description,
        startDate,
        endDate,
        completed,
      };

      console.log();
      const data = JSON.stringify(updatedTask);

      updateTask!(editTaskId!, data);
      hideModal!();
    }
  };

  return (
    <div className={styles.form_container}>
      <h1>{formTitle}</h1>
      <p>{formSubtitle}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        {usernameField && (
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              minLength={3}
              maxLength={30}
              required
              onChange={(e) => [setUsername(e.target.value), setError("")]}
              value={username}
            />
          </div>
        )}

        {emailField && (
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              required
              onChange={(e) => [setEmail(e.target.value), setError("")]}
              value={email}
            />
          </div>
        )}

        {passwordField && (
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              name="password"
              minLength={3}
              max={16}
              required
              onChange={(e) => [setPassword(e.target.value), setError("")]}
              value={password}
            />
          </div>
        )}

        {confirmPasswordField && (
          <div>
            <label htmlFor="confirmPassword">Confirme sua senha:</label>
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={(e) => [
                setConfirmPassword(e.target.value),
                setError(""),
              ]}
              value={confirmPassword}
            />
          </div>
        )}

        {titleField && (
          <div>
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              name="title"
              placeholder="Ex.: Colocar lixo na rua"
              maxLength={60}
              required
              onChange={(e) => [setTitle(e.target.value), setError("")]}
              value={title}
            />
          </div>
        )}

        {descriptionField && (
          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea
              name="description"
              placeholder="Ex.: Retirar os lixos de todos os cômodos e juntar com os de fora"
              cols={40}
              rows={3}
              maxLength={500}
              required
              onChange={(e) => [setDescription(e.target.value), setError("")]}
              value={description}
            />
          </div>
        )}

        {startDateField && (
          <div>
            <label htmlFor="startDate">Data Inicial:</label>
            <input
              type="date"
              name="startDate"
              onChange={(e) => [setStartDate(e.target.value), setError("")]}
              value={startDate}
            />
          </div>
        )}

        {endDateField && (
          <div>
            <label htmlFor="endDate">Data Final:</label>
            <input
              type="date"
              name="endDate"
              onChange={(e) => [setEndDate(e.target.value), setError("")]}
              value={endDate}
            />
          </div>
        )}

        {completedField && (
          <div>
            <label htmlFor="completed">Completada:</label>
            <input
              type="checkbox"
              name="completed"
              onChange={() => [
                setCompleted((prevState) => !prevState),
                setError(""),
              ]}
              checked={completed}
            />
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.button_container}>
          {clearBtn ? (
            <input
              className={styles.cancel_clear}
              type="reset"
              value="Limpar"
            />
          ) : (
            <>
              {editTaskId ? (
                <button
                  className={styles.cancel_clear}
                  onClick={() => setCancelSubmit(true)}
                >
                  Cancelar
                </button>
              ) : (
                <Link to="/register">Registrar</Link>
              )}
            </>
          )}
          <input className={styles.add_update} type="submit" value={btnText} />
        </div>
      </form>
    </div>
  );
};

export default Form;
