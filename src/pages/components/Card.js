// Card.js
import React from "react";

const Card = ({ title, description, children }) => {
  return (
    <div className="shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div>{children}</div>
    </div>
  );
};

export default Card;
