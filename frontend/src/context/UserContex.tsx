import { createContext, ReactNode } from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const URL = "http://localhost:8000";

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
  id?: number;
  username?: string;
  email: string;
  password: string;
}

export interface Tasks {
  id: number;
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
  userTasks?: Tasks[];
  signin?: ({ email, password }: LoginUserProps) => string | void;
  signup?: ({ username, email, password }: AllUserProps) => string;
  signout?: () => void;
}

export const AuthContextProvider = ({ children }: ProvideProps) => {
  const [user, setUser] = useState<LoginUserProps | null>(null);
  const [newUser, setNewUser] = useState<AllUserProps>({} as AllUserProps);
  const [usersStorage, setUsersStorage] = useState([]);
  const [userTasks, setUserTasks] = useState([]);

  const signed = localStorage.getItem("signed") === null ? false : true;

  // Get Tasks for Database
  useEffect(() => {
    const getTasks = async (id: number | undefined) => {
      const response = await fetch(`${URL}/tasks/${id}`);
      const tasks = await response.json();
      setUserTasks(tasks);
    };

    //getTasks(user?.id);
    getTasks(1); // MUDAR DPS
  }, [user]);

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

  const signin = ({ email, password }: LoginUserProps) => {
    const hasUser: LoginUserProps[] = usersStorage?.filter(
      (user: LoginUserProps) => user.email === email
    );

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = uuidv4();
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        localStorage.setItem("signed", "true");
        setUser({ email, password });
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
  };

  return (
    <AuthContext.Provider
      value={{ user, userTasks, signed, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};