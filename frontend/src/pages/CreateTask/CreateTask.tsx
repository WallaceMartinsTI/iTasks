// COMPONENTS
import Form from "../../components/Form/Form";

const CreateTask = () => {
  return (
    <div>
      <Form
        titleField={true}
        descriptionField={true}
        startDateField={true}
        endDateField={true}
        completedField={true}
        btnText="Adicionar"
        formType="ADDTRASK"
        formTitle="Nova Tarefa"
        formSubtitle="Crie uma tarefa para vê-la na tela inicial"
      />
    </div>
  );
};

export default CreateTask;
