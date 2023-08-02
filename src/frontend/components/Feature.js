import React from "react";
import * as FontAwesome from "react-icons/fa";

const Feature = ({ iconName }) => {
  const Icon = FontAwesome[iconName];
  return (
    <div className="feature">
      <div className="feature__circle">
        <Icon className="feature__icon" />
      </div>
    </div>
  );
};

export default Feature;
