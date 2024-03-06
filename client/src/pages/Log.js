import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const Log = () => {
  return (
    <>
      <Header />
      <section className="log-section">
        <div className="left-part">
          <div className="img-container">
            <img
              src="./img/illustartion/secure.png"
              alt="secure-3D-pannel-illustration"
            />
          </div>
        </div>
        <div className="right-part">
          <LoginForm />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Log;
