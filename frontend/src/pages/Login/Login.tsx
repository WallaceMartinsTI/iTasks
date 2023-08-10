import Form from "../../components/Form/Form";

const Login = () => {
  return (
    <div>
      <Form
        emailField={true}
        passwordField={true}
        clearBtn={false}
        btnText="Entrar"
        formType="LOGIN"
        formTitle="Entrar"
        formSubtitle="Faça login para criar e ver suas tarefas"
      />
    </div>
  );
};

export default Login;
