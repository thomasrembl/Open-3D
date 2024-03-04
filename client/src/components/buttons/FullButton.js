import React from "react";

const FullButton = ({ content, color }) => {
  return (
    <div className="full-button">
      {color === 1 ? (
        <p className="white">{content}</p>
      ) : (
        <p className="blue">{content}</p>
      )}
    </div>
  );
};

export default FullButton;
