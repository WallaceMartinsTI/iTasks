import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CreateTask from "./pages/CreateTask/CreateTask";
import styles from "./App.module.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { AuthContextProvider, AuthProps } from "./context/UserContex";
import useAuth from "./hooks/useAuth";

interface PrivateProps {
  Item: FC;
}

interface SignedProps {
  signed?: boolean;
}

const Private = ({ Item }: PrivateProps) => {
  const { signed }: SignedProps = useAuth();

  if (Item.name == "CreateTask") {
    return signed ? <Item /> : <Login />;
  } else {
    return signed ? <Home /> : <Item />;
  }
};

function App() {
  return (
    <>
      <AuthContextProvider>
        <div className={styles.App}>
          <BrowserRouter>
            <Header />
            <main className={styles.container}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/createtask/"
                  element={<Private Item={CreateTask} />}
                />
                <Route path="/login" element={<Private Item={Login} />} />

                <Route path="/register" element={<Private Item={Register} />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </div>
      </AuthContextProvider>
    </>
  );
}

export default App;
