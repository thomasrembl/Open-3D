import React, { useState } from "react";
import avisData from "../data/data";

const Avis = () => {
  const [selectedDiv, setSelectedDiv] = useState(2);

  const handleSelect = (index) => {
    setSelectedDiv(index);
  };

  return (
    <div className="avis-content">
      <p>{avisData[selectedDiv].contenu}</p>
      <div className="info">
        <h3>{avisData[selectedDiv].nomPrenom}</h3>
        <h4>
          <span className="light-italic">{avisData[selectedDiv].travail}</span>
        </h4>
      </div>
      <div className="selector">
        {avisData.map((item, index) => (
          <img
            key={index}
            className={`select ${selectedDiv === index && "active"}`}
            onClick={() => handleSelect(index)}
            src={item.photo}
            alt="user pic"
          />
        ))}
      </div>
    </div>
  );
};

export default Avis;
