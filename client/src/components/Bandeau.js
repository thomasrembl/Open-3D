import React from "react";

const Bandeau = () => {
  function bannerOff() {
    var banner = document.getElementsByClassName("bandeau")[0];
    banner.classList.add("off");
  }
  return (
    <div className="bandeau" onClick={bannerOff}>
      <p>&#x26A0;</p>
      <p>&#x26A0; Ce site est un projet étudiant &#x26A0;</p>
      <p>close &#10060;</p>
    </div>
  );
};

export default Bandeau;
