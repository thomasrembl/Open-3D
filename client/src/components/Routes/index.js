import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import BecameTeacher from "../../pages/BecameTeacher";
import Lessons from "../../pages/Lessons";
import Contact from "../../pages/Contact";
import Politique from "../../pages/Politique";
import Mention from "../../pages/Mention";
import Log from "../../pages/Log";
import Account from "../../pages/Account";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devenir-prof" element={<BecameTeacher />} />
        <Route path="/cours" element={<Lessons />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/connexion" element={<Log />} />
        <Route path="/mon-compte" element={<Account />} />
        <Route path="/mentions-legale" element={<Mention />} />
        <Route path="/politique-de-confidentialite" element={<Politique />} />
      </Routes>
    </Router>
  );
};

export default index;
