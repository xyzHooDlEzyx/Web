import React from "react";
import classNames from "classnames";
import "./button.css";

export default function Button({
  children,
  type = "solid",
  Big = false,
  color,
  ...props
}) {
  const buttonClass = classNames("button", {
    "button-solid": type === "solid",
    "button-outline": type === "outline" || type === "outline-src",
    "button-big": Big,
    [color]: color,
  });

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}
