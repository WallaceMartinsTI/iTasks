// REACT
import { FC } from "react";

// REACT ROUTER
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CONTEXT
import { AuthContextProvider } from "./context/UserContex";

// HOOKS
import useAuth from "./hooks/useAuth";

// PAGES
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateTask from "./pages/CreateTask/CreateTask";
import About from "./pages/About/About";

// COMPONENTS
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// CSS
import styles from "./App.module.scss";

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
            <div className={styles.content}>
              <Header />
              <main className={styles.container}>
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route
                    path="/createtask/"
                    element={<Private Item={CreateTask} />}
                  />
                  <Route path="/login" element={<Private Item={Login} />} />

                  <Route
                    path="/register"
                    element={<Private Item={Register} />}
                  />

                  <Route path="/about" element={<Private Item={About} />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </div>
      </AuthContextProvider>
    </>
  );
}

export default App;
