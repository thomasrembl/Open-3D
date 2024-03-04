import React from "react";
import { useNavigate } from "react-router-dom";
import FullButton from "./buttons/FullButton";
import StrokeButton from "./buttons/StrokeButton";

const Header = () => {
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

  const connected = false;

  return (
    <header>
      <img
        className="logo"
        src="./img/logo/logo-long-white.png"
        alt="long logo"
      />
      <div className="content-container">
        <div className="links">
          <p onClick={goHome}>Acceuil</p>
          <p onClick={goLessons}>Cours</p>
          <p onClick={goBecameTeacher}>Devenir Prof</p>
          <p onClick={goContact}>Contact</p>
        </div>
        <div className="buttons-container">
          {connected ? (
            <FullButton content="Mon Compte" color={1} />
          ) : (
            <>
              <FullButton content="Connexion" color={1} />
              <StrokeButton content="Créer mon Compte" color={1} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
