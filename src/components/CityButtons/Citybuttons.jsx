import React, { useState } from "react";
import "./CityButtons.css";

const Citybuttons = ({ cities, updateCities, handleDeleteCity, addCity }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addToCity();
    }
  };

  const addToCity = () => {
    if (searchTerm.trim()) {
      addCity({ name: searchTerm.trim() });
      setSearchTerm("");
    }
  };

  return (
    <div className="buttons-group">
      {cities.map((city, index) => (
        <div key={index} className="button-icon-wrapper">
          <button
            onClick={() => updateCities(city.name)}
            className={`general-button city-button ${
              city.selected ? "selected-button" : ""
            }`}
          >
            {city.name}
          </button>
          {index !== 0 && (
            <span
              className="delete-icon"
              onClick={() => handleDeleteCity(city)}
            >
              ×
            </span>
          )}
        </div>
      ))}
      <div className="search-bar-section">
        <input
          className="search-field"
          type="search"
          placeholder="Add city to search"
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="general-button add-button" onClick={addToCity}>
          {"Add City"}
        </button>
      </div>
    </div>
  );
};

export default Citybuttons;
