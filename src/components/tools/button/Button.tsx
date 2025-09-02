import React from "react";

import Icon from "@tools/icon/Icon";

import "./button.css";

export enum EButton {
  submit = "submit",
  reset = "reset",
  button = "button",
}

interface IButton {
  text: string;
  className?: string;
  onClick?: () => void;
  type: EButton;
  icon?: string;
  iconColor?: string;
}

const Button: React.FC<IButton> = ({
  text,
  className,
  onClick,
  icon,
  iconColor,
}) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && <Icon name={icon} size={20} color={iconColor ?? "#fff"} />}
      {text}
    </button>
  );
};

export default Button;
