import React from "react";
import privacyPolicy from "../data/privacyPolicy";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Politique = () => {
  return (
    <>
      <Header />
      <section className="template">
        <h1>
          Politique de <span className="italic">confidentialité</span>
        </h1>
        <div className="content">
          {privacyPolicy.map((item, index) => (
            <>
              <h3 key={index}>{item.title}</h3>
              <p key={index}>{item.text}</p>
            </>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Politique;
