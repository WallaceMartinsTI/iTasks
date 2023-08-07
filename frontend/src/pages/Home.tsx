import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <main>conteudo...</main>
      <Footer />
    </div>
  );
};

export default Home;
