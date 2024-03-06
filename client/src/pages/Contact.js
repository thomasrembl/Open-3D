import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Header />
      <section className="contact-content">
        <div className="title">
          <h1>UNE QUESTION ?</h1>
          <h2>
            <span className="light-italic">NOUS CONTACTEZ</span>
          </h2>
        </div>
        <form action="">
          <div className="top-content">
            <div className="left-content">
              <div className="line-content">
                <input
                  className="field"
                  type="text"
                  name="nom"
                  id="nom"
                  placeholder="Nom"
                  required="true"
                />
                <div className="line"></div>
              </div>
              <div className="line-content">
                <input
                  className="field"
                  type="text"
                  name="prenom"
                  id="prenom"
                  placeholder="Prénom"
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
                  type="text"
                  name="motif"
                  id="motif"
                  placeholder="Motif"
                  required="true"
                />
                <div className="line"></div>
              </div>
            </div>
            <div className="right-content">
              <div className="line-content">
                <textarea
                  className="field"
                  name="text"
                  id="text"
                  placeholder="Votre Message"
                ></textarea>
                <div className="line"></div>
              </div>
            </div>
          </div>
          <div className="bottom-content">
            <div className="checkbox">
              <label class="b-contain">
                <p>
                  <span className="italic">
                    En cochant cette case j’accepte la Politique de
                    confidentialité
                  </span>
                </p>
                <input type="checkbox" name="CGV" id="CGV" required="true" />
                <div class="b-input"></div>
              </label>
            </div>
            <input type="submit" value="Envoyer mon Message" />
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
