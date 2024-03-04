import React, { useState } from "react";

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    <div className="filter-bar">
      <div
        className={`filter ${activeFilter === "all" && "active"}`}
        id="all"
        onClick={() => handleFilterClick("all")}
      >
        <p>Voire Tout</p>
      </div>
      <div
        className={`filter ${activeFilter === "animation" && "active"}`}
        id="animation"
        onClick={() => handleFilterClick("animation")}
      >
        <p>Animation</p>
      </div>
      <div
        className={`filter ${activeFilter === "brand" && "active"}`}
        id="brand"
        onClick={() => handleFilterClick("brand")}
      >
        <p>Brand design</p>
      </div>
      <div
        className={`filter ${activeFilter === "mockup" && "active"}`}
        id="mockup"
        onClick={() => handleFilterClick("mockup")}
      >
        <p>Mockup</p>
      </div>
      <div
        className={`filter ${activeFilter === "caractere" && "active"}`}
        id="caractere"
        onClick={() => handleFilterClick("caractere")}
      >
        <p>Personnage</p>
      </div>
    </div>
  );
};

export default FilterBar;
