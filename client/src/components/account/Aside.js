// Aside.jsx
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Aside = ({ onSelectCategory, initialSelectedCategory }) => {
  const handleClick = (category) => {
    onSelectCategory(category);
  };
  const role = "admin";
  return (
    <aside className="account-aside">
      <div className="top-content">
        <div
          className={`a-link ${
            initialSelectedCategory === "Mes informations" ? "active" : ""
          }`}
          onClick={() => handleClick("Mes informations")}
        >
          <p>Mes informations</p>
          <div className="a-line"></div>
        </div>
        <div
          className={`a-link ${
            initialSelectedCategory === "Mes cours suivis" ? "active" : ""
          }`}
          onClick={() => handleClick("Mes cours suivis")}
        >
          <p>Mes cours suivis</p>
          <div className="a-line"></div>
        </div>
        {role !== "eleve" && (
          <div
            className={`a-link ${
              initialSelectedCategory === "Mes cours" ? "active" : ""
            }`}
            onClick={() => handleClick("Mes cours")}
          >
            <p>Mes cours</p>
            <div className="a-line"></div>
          </div>
        )}
        {role === "admin" && (
          <div
            className={`a-link ${
              initialSelectedCategory === "Admin" ? "active" : ""
            }`}
            onClick={() => handleClick("Admin")}
          >
            <p>Admin</p>
            <div className="a-line"></div>
          </div>
        )}
      </div>
      <div className="bottom-content">
        <div className="logout">
          <FaSignOutAlt />
          <p>Déconnexion</p>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
