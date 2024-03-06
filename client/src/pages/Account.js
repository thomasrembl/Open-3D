// Account.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Aside from "../components/account/Aside";

const Account = () => {
  const [selectedCategory, setSelectedCategory] = useState("Mes informations"); // Initialise avec "Mes informations"

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Mettre à jour l'état avec la catégorie sélectionnée
  };

  return (
    <>
      <Header />
      <section className="account-content">
        <Aside
          onSelectCategory={handleCategorySelect}
          initialSelectedCategory={selectedCategory}
        />{" "}
        {/* Passe selectedCategory comme initialSelectedCategory */}
        {selectedCategory === "Mes informations" && (
          <div>Contenu de Mes informations</div>
        )}
        {selectedCategory === "Mes cours suivis" && (
          <div>Contenu de Mes cours suivis</div>
        )}
        {selectedCategory === "Mes cours" && <div>Contenu de Mes cours</div>}
        {selectedCategory === "Admin" && <div>Contenu d'Admin</div>}
      </section>
      <Footer />
    </>
  );
};

export default Account;
