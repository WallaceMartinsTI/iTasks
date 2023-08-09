import Form from "../../components/Form/Form";

const Register = () => {
  return (
    <div>
      <Form
        usernameField={true}
        emailField={true}
        passwordField={true}
        confirmPasswordField={true}
        btnText="Registrar"
        formType="REGISTER"
        formTitle="Registro"
        formSubtitle="Crie sua conta e começe a salvar suas tarefas"
      />
    </div>
  );
};

export default Register;
