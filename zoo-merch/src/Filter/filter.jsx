import React from "react";
import "./filter.css";

const Filter = ({ Label, options, id, onChange }) => {
  return (
    <select className="filter" id={id} onChange={onChange}>
      <option value="">{Label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Filter;
