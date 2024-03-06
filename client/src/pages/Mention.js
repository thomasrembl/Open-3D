import React from "react";
import LegalMention from "../data/legalMention";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Mention = () => {
  return (
    <>
      <Header />
      <section className="template">
        <h1>
          Mention <span className="italic">légales</span>
        </h1>
        <div className="content">
          {LegalMention.map((item, index) => (
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

export default Mention;
