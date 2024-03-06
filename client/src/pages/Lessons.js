import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterBar from "../components/lesson/FilterBar";

const Lessons = () => {
  return (
    <>
      <Header />
      <section className="lesson-section">
        <div className="top-part">
          <>
            <h1>NOS COURS</h1>
            <FilterBar />
          </>
        </div>
        <div className="lesson-thread"></div>
      </section>
      <Footer />
    </>
  );
};

export default Lessons;
