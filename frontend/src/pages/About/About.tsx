// CSS
import styles from "./About.module.scss";

const About = () => {
  return (
    <div className={styles.about}>
      <h1>Sobre</h1>
      <p>
        Esta aplicação tem como objetivo registrar e acompanhar suas tarefas,
        podendo editar ou deletar cada uma delas, além de contar com{" "}
        <span>cadastro</span> e <span>login</span> de usuário. Desenvolvida em{" "}
        <span>ReactJS</span> no frontend, <span>Django Rest Framework</span> no
        backend e utiliza o banco de dados <span>Postgresql</span>.
      </p>
      <section>
        <div>
          <h2>Tecnologias utilizadas</h2>

          <div className={styles.techs}>
            <div>
              <li className={styles.list_header}>Frontend</li>
              <ul className={styles.front_container}>
                <li>ReactJS;</li>
                <li>Typescript;</li>
                <li>Vite;</li>
                <li>Uuid;</li>
                <li>Sass;</li>
              </ul>
            </div>

            <div>
              <li className={styles.list_header}>Backend</li>
              <ul className={styles.back_container}>
                <li>Python;</li>
                <li>Django;</li>
                <li>Django Rest Framework;</li>
              </ul>
            </div>

            <div>
              <li className={styles.list_header}>Database</li>
              <ul className={styles.db_container}>
                <li>Postgresql;</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.dev_infos}>
          <h2>Desenvolvedor</h2>
          <p>Wallace Martins</p>
          <div>
            <span>Links</span>
            <a href="https://github.com/WallaceMartinsTI/" target="_blank">
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/wallace-martins-ti/"
              target="_blank"
            >
              Linkedin
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
