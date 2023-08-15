// REACT
import { useState, useEffect, createContext, ReactNode } from "react";

// MODULES
import { v4 as uuidv4 } from "uuid";

const URL = import.meta.env.VITE_BASE_URL;

export const AuthContext = createContext({});

interface ProvideProps {
  children: ReactNode;
}

interface AllUserProps {
  username: string;
  email: string;
  password: string;
}

interface LoginUserProps {
  id?: string;
  username?: string;
  email: string;
  password: string;
}

export interface Tasks {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  ownerId: number;
  completed: boolean;
}

export interface AuthProps {
  user?: LoginUserProps;
  signed?: boolean;
  isLoading?: boolean;
  userTasks?: Tasks[];

  isModalOpen?: boolean;
  setIsModalOpen?: (data: boolean) => void;
  editTaskId?: string;
  setEditTaskId?: (data: string) => void;

  addTask?: (data: string) => Response;
  updateTask?: (taskId: string, data: string) => Response;
  deleteTask?: (taskId: string) => Response;
  signin?: ({ email, password }: LoginUserProps) => string | void;
  signup?: ({ username, email, password }: AllUserProps) => string;
  signout?: () => void;
}

export const AuthContextProvider = ({ children }: ProvideProps) => {
  const [user, setUser] = useState<LoginUserProps | null>(null);
  const [newUser, setNewUser] = useState<AllUserProps>({} as AllUserProps);
  const [usersStorage, setUsersStorage] = useState([]);
  const [userTasks, setUserTasks] = useState<Tasks[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");

  const signed = localStorage.getItem("signed") === null ? false : true;
  const userId =
    localStorage.getItem("user_id") === null
      ? "0"
      : localStorage.getItem("user_id");

  // Get Tasks for Database
  useEffect(() => {
    async function delayedFunction() {
      //console.log("Esperando por 2 segundos...");
      setIsLoading(true);

      // Wait 2 seconds to show loading before fetch
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const getTasks = async (id: string | undefined) => {
        const response = await fetch(`${URL}/tasks/${id}`);
        const tasks = await response.json();
        setUserTasks(tasks);
      };

      getTasks(userId!);
      //setIsLoading(false);
      //console.log("A função foi executada após 2 segundos");
    }

    delayedFunction();
  }, [user]);

  useEffect(() => {
    setIsLoading(false);
  }, [userTasks]);

  // Get Users from Database
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${URL}/users`);
      const users = await response.json();
      setUsersStorage(users);
    };

    getUsers();
  }, [newUser]);

  // Set actual user
  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken && usersStorage) {
      const hasUser = usersStorage?.filter(
        (user: LoginUserProps) => user.email === JSON.parse(userToken).email
      );
      if (hasUser) setUser(hasUser[0]);
    }
  }, [user]);

  // Convert data to add new user to Database
  useEffect(() => {
    if (!!Object.keys(newUser).length) {
      const json = JSON.stringify(newUser);
      addUser(json);
    }
  }, [newUser]);

  // Save new user on Database
  const addUser = async (data: string) => {
    try {
      const response = await fetch(`${URL}/createuser/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Add a new task to Database
  const addTask = async (data: string) => {
    try {
      const response = await fetch(`${URL}/createtask/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      const newTask = await response.json();

      setUserTasks((prevTasks) => [...prevTasks, newTask]);
      alert("Tarefa criada com sucesso!");

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Update a Task
  const updateTask = async (taskId: string, data: string) => {
    try {
      const response = await fetch(`${URL}/tasks/${taskId}/update/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      const updatedTask = await response.json();

      setUserTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );

      setEditTaskId("");
      alert("Tarefa atualizada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`${URL}/tasks/${taskId}/delete/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUserTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
        setEditTaskId("");
        alert("Tarefa excluída com sucesso!");
      } else {
        alert("Erro ao excluir a tarefa.");
      }
    } catch (error) {}
  };

  const signin = ({ email, password }: LoginUserProps) => {
    const hasUser: LoginUserProps[] = usersStorage?.filter(
      (user: LoginUserProps) => user.email === email
    );

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const userId = hasUser[0].id;
        const token = uuidv4();
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        localStorage.setItem("signed", "true");
        localStorage.setItem("user_id", userId!);
        setUser({ id: userId, email, password });
        return;
      } else {
        return "E-mail ou senha incorretos.";
      }
    } else {
      return "Usuário não cadastrado.";
    }
  };

  const signup = ({ username, email, password }: AllUserProps) => {
    const hasEmail = usersStorage?.filter(
      (user: LoginUserProps) => user.email === email
    );

    const hasUsername = usersStorage?.filter(
      (user: LoginUserProps) => user.username === username
    );

    const hasUser = hasEmail.length || hasUsername.length;

    if (hasUser !== 0) {
      if (hasEmail.length !== 0) {
        return "Já existe uma conta com este E-mail.";
      } else if (hasUsername.length !== 0) {
        return "Este usuário já existe.";
      }
    }

    if (usersStorage) {
      setNewUser({ username, email, password });
    }
    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
    localStorage.removeItem("signed");
    localStorage.removeItem("user_id");

    localStorage.removeItem("user_tasks");

    setUserTasks([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userTasks,
        addTask,
        updateTask,
        deleteTask,
        signed,
        signin,
        signup,
        signout,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        editTaskId,
        setEditTaskId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
