import React from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  const goLessons = () => {
    navigate("/cours");
  };
  const goBecameTeacher = () => {
    navigate("/devenir-prof");
  };
  const goContact = () => {
    navigate("/contact");
  };
  const goLog = () => {
    navigate("/connexion");
  };
  const goMention = () => {
    navigate("/mentions-legale");
  };
  const goPolitique = () => {
    navigate("/politique-de-confidentialite");
  };

  return (
    <footer>
      <div className="top-content">
        <div className="content">
          <div className="description">
            <p>
              <span className="bold">Open 3D</span>
            </p>
            <p>
              Open 3D : Tutoriels gratuits pour apprendre la 3D. Modélisation,
              animation, rendu. Accessible à tous les niveaux. Libérez votre
              créativité!
            </p>
          </div>
          <div className="contact">
            <p>
              <span className="bold">Contact</span>
            </p>
            <div className="link-conteneur">
              <p>Mail</p>
              <p>Téléphone</p>
              <p>Adresse</p>
              <p>CP</p>
            </div>
          </div>
          <div className="plan">
            <p>
              <span className="bold">Plan du Site</span>
            </p>
            <div className="link-conteneur">
              <div onClick={goHome}>
                <p>Acceuil</p>
              </div>
              <div onClick={goLessons}>
                <p>Cours</p>
              </div>
              <div onClick={goBecameTeacher}>
                <p>Devenir Prof</p>
              </div>
              <div onClick={goContact}>
                <p>Contact</p>
              </div>
              <div onClick={goLog}>
                <p>Connexion</p>
              </div>
            </div>
          </div>
        </div>
        <div className="img-content">
          <img src="./img/logo/Logo.png" alt="logo" />
        </div>
      </div>
      <div className="bottom-content">
        <div onClick={goMention}>
          <p>Mention légales</p>
        </div>
        <div onClick={goPolitique}>
          <p>Politique de Confidentialité</p>
        </div>
        <div>
          <a
            href="https://x.com/kc_thomaaas?s=21&t=dXNcyaI4P-ia8v9YzvLrVg"
            target="_blank"
            rel="noreferrer"
          >
            <p>Copyright 2024 Thomas REMBLIER</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
