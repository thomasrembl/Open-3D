import React, { useState } from "react";

const LoginForm = () => {
  const [register, setRegister] = useState(false);
  const [loginActive, setLoginActive] = useState(true);

  const handleLoginClick = () => {
    setRegister(false);
    setLoginActive(true);
  };

  const handleRegisterClick = () => {
    setRegister(true);
    setLoginActive(false);
  };

  return (
    <div className="login-form">
      <div className="top-bar">
        <div>
          <p className={loginActive ? "active" : ""} onClick={handleLoginClick}>
            Se connecter
          </p>
        </div>
        <div>
          <p className={register ? "active" : ""} onClick={handleRegisterClick}>
            Créer mon Compte
          </p>
        </div>
      </div>
      {register ? (
        <form action="">
          <div className="line-content">
            <input
              className="field"
              type="text"
              name="pseudo"
              id="pseudo"
              placeholder="Pseudo"
              required="true"
            />
            <div className="line"></div>
          </div>
          <div className="line-content">
            <input
              className="field"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required="true"
            />
            <div className="line"></div>
          </div>
          <div className="line-content">
            <input
              className="field"
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              required="true"
            />
            <div className="line"></div>
          </div>
          <div className="checkbox">
            <label class="b-contain">
              <p>
                <span className="italic">
                  En cochant cette case j’accepte les CGV
                </span>
              </p>
              <input type="checkbox" name="CGV" id="CGV" required="true" />
              <div class="b-input"></div>
            </label>
          </div>
          <div className="validate">
            <input
              className="submit-btn"
              type="submit"
              value="Créer mon Compte"
            />
            <p></p>
          </div>
        </form>
      ) : (
        <form action="">
          <div className="line-content">
            <input
              className="field"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required="true"
            />
            <div className="line"></div>
          </div>
          <div className="line-content">
            <input
              className="field"
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              required="true"
            />
            <div className="line"></div>
          </div>

          <div className="validate">
            <input className="submit-btn" type="submit" value="Se Connecter" />
            <p>
              <span className="italic">Mot de passe oublié ?</span>
            </p>
          </div>
        </form>
      )}
      ;
    </div>
  );
};

export default LoginForm;
