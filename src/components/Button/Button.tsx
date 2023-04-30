import React, { useContext } from "react";
import "./Button.scss";
import returnArrow from "../../assets/return-arrow.svg";
import { ThemeContext } from "../../utils/ThemeProvider";

interface Props {
  text: string;
  className?: string;
}

const Button: React.FC<Props> = ({ text, className }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <button className={`btn ${className}`}>
      {className === "btn--return" && (
        <img src={returnArrow} className="return-arrow" />
      )}
      {text}
    </button>
  );
};

export default Button;
