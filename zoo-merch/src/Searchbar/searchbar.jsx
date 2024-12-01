import "./searchbar.css";
import Button from "../button/button";
import Filter from "../Filter/filter";

const Searchbar = () => {
  const filter1Options = ["Option 1", "Option 2", "Option 3"];
  const filter2Options = ["Option 1", "Option 2", "Option 3"];
  const filter3Options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div className="searchbar-container">
      <Filter Label="Filter 1" options={filter1Options} id="filter-1" />
      <Filter Label="Filter 2" options={filter2Options} id="filter-2" />
      <Filter Label="Filter 3" options={filter3Options} id="filter-3" />
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
