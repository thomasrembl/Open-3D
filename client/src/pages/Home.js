import React from "react";
import Header from "../components/Header";
import FullButton from "../components/buttons/FullButton";
import StrokeButton from "../components/buttons/StrokeButton";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/lesson/FilterBar";
import Avis from "../components/Avis";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const goLesson = () => {
    navigate("/cours");
  };

  return (
    <>
      <Header />
      <section className="first-section">
        <div className="container">
          <div className="img-container">
            <img
              src="./img/illustartion/solar-systeme.png"
              alt="solar systeme"
            />
          </div>
        </div>
        <div className="content">
          <h1>
            La référence en <span className="italic">tuto 3D</span>
          </h1>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus. Nullam quis imperdiet augue.{" "}
          </p>
          <div className="button-container">
            <div onClick={goLesson}>
              <FullButton content="Nos cours" color={1} />
            </div>
            <a href="#comment-ca-marche">
              <StrokeButton content="Comment ça marche ?" color={1} />
            </a>
          </div>
        </div>
      </section>
      <section className="second-section">
        <h2 id="comment-ca-marche">
          COMMENT <span className="italic">CA MARCHE</span>
        </h2>
        <div className="grid-container">
          <div className="first-grid">
            <div className="img-container">
              <img src="./img/illustartion/rocket.png" alt="rocket" />
            </div>
          </div>
          <div className="second-grid">
            <h3>
              <span className="regular">
                Êtes vous prêt{" "}
                <span className="regular-italic"> à apprendre</span> la 3D ?
              </span>
            </h3>
            <div className="btn-container" onClick={goLesson}>
              <FullButton content="Voir les cours" color={1} />
            </div>
          </div>
          <div className="third-grid">
            <h4>Pour les élèves</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi..Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
              massa mi..Lorem ipsum dolor sit amet consectetur adipiscing elit
              Ut{" "}
            </p>
            <div className="link">
              <p>Devenir élève &gt;&gt;</p>
            </div>
          </div>
          <div className="fourth-grid">
            <h4>Pour les profs</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi..Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
              massa mi..Lorem ipsum dolor sit amet consectetur adipiscing elit
              Ut{" "}
            </p>
            <div className="link">
              <p>Devenir prof &gt;&gt;</p>
            </div>
          </div>
        </div>
      </section>
      <section className="third-section">
        <div className="top-content">
          <h2>
            NOS COURS <span className="italic"> POPULAIRE</span>
          </h2>
          <FilterBar />
        </div>
      </section>
      <section className="fourth-section">
        <div className="top-content">
          <h2>
            CE QU'ILS PENSENT DE <span className="italic"> NOUS</span>
          </h2>
          <p>vos avis</p>
          <div className="img-container">
            <img src="./img/icon/Guillmet.png" alt="guillmet" />
          </div>
          <Avis />
        </div>
      </section>
      <section className="fifth-section">
        <div className="left-content">
          <h2>
            C'est le moment de <span>commencer la 3D</span>
          </h2>
          <p className="description">
            Avec open 3D l’apprentissage de la 3D n’a jamais était aussi simple.
            Les cours sont gratuit, centralisé et réalisé par des
            professionnels. Comment commencer ? C’est simple et seulement en 3
            étapes{" "}
          </p>
          <div className="puce-conteneur">
            <div className="puce">
              <div className="img-content">
                <img
                  src="./img/icon/react-icons/fa/FaCheckCircle.png"
                  alt="puce"
                />
              </div>
              <p>
                <span className="bold">Créer son Compte</span>
              </p>
            </div>
            <div className="puce">
              <div className="img-content">
                <img
                  src="./img/icon/react-icons/fa/FaCheckCircle.png"
                  alt="puce"
                />
              </div>
              <p>
                <span className="bold">Choisir son cours</span>
              </p>
            </div>
            <div className="puce">
              <div className="img-content">
                <img
                  src="./img/icon/react-icons/fa/FaCheckCircle.png"
                  alt="puce"
                />
              </div>
              <p>
                <span className="bold">Apprendre ne réalisant des projets</span>
              </p>
            </div>
          </div>
        </div>
        <div className="right-content">
          <img src="./img/illustartion/pc.png" alt="pc illustration" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
