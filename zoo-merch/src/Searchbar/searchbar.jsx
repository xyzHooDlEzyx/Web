import "./searchbar.css";
import Button from "../button/button";
const Searchbar = () => {
  return (
    <div className="searchbar-container">
      <select id="filter-1" className="filter">
        <option>Filter 1</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <select id="filter-2" className="filter">
        <option>Filter 2</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <select id="filter-3" className="filter">
        <option>Filter 3</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <div className="search-input-container">
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Type something..."
        />
        <img src="/searchbar.svg" className="search-icon" />
      </div>
      <Button type="outline">Apply</Button>
    </div>
  );
};

export default Searchbar;
