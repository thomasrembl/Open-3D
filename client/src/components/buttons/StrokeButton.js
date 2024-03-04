import React from "react";

const StrokeButton = ({ content, color }) => {
  return (
    <div className="stroke-button">
      {color === 1 ? (
        <p className="white">{content}</p>
      ) : (
        <p className="blue">{content}</p>
      )}
    </div>
  );
};

export default StrokeButton;
