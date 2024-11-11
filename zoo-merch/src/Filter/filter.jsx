import "./filter.css";

const Filter = ({ Label, options, id }) => {
  return (
    <select className="filter" id={id}>
      <option>{Label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Filter;
