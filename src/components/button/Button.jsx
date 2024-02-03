import React from "react";
import Style from "./button.module.css";

const Button = ({title, handleClick}) => {
  return (
    <button
      className={`${Style.button} d-flex align-items-center`}
      onClick={handleClick}
    >
      {title || "submit"}
    </button>
  );
};

export default Button;
