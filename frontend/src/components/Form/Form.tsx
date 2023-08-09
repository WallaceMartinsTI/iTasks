import styles from "./Form.module.scss";
import { useState, FormEvent } from "react";
import { AuthProps } from "../../context/UserContex";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
  btnText: string;
  formType: "REGISTER" | "LOGIN" | "ADDTRASK";
  formTitle: string;
  formSubtitle: string;
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
  btnText,
  formType,
  formTitle,
  formSubtitle,
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
  const [endDate, setEndDate] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { signup, signin }: AuthProps = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formType === "REGISTER") {
      if (!username || !email || !password || !confirmPassword) {
        setError("Preencha todos os campos");
        return;
      } else if (password !== confirmPassword) {
        setError("As senhas não sãos iguais");
        return;
      }

      console.log("form");
      console.log({ username, email, password });
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
            {/* implementar erro personalizado no campo */}
            <p className={(styles.error, "hidden")}>Erro</p>
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
              maxLength={100}
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
              min={dates.formattedDate}
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
              min={dates.formattedDate}
              max={dates.formattedFutureDate}
              onChange={(e) => [setEndDate(e.target.value), setError("")]}
              value={endDate}
            />
          </div>
        )}

        {completedField && (
          <div>
            <label htmlFor="endDate">Data Final:</label>
            <input type="checkbox" name="endDate" />
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.button_container}>
          <input type="reset" value="Limpar" />
          <input type="submit" value={btnText} />
        </div>
      </form>
    </div>
  );
};

export default Form;
