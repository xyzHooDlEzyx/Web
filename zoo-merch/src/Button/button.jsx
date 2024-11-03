import React from "react";
import "./button.css";

export default function Button({
  children,
  type = "solid",
  Big = false,
  ...props
}) {
  let style;
  switch (type) {
    case "solid":
      style = `button button-solid ${Big && "button-big"}`;
      break;
    case "outline":
      style = `button button-outline ${Big && "button-big"}`;
      break;
  }
  return (
    <button className={style} {...props}>
      {children}
    </button>
  );
}
