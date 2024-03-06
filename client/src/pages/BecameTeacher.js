import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BecameTeacher = () => {
  return (
    <>
      <Header />
      <section className="became-teacher">
        <h1>
          COMMENT DEVENIR <br></br>
          <span className="italic">PROF ?</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
          suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at
          maximus ante.
        </p>
        <form action="">
          <div className="input-content">
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
            <input type="submit" value="Faire ma demande" />
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default BecameTeacher;
