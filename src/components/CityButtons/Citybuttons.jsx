import React from "react";
import "./CityButtons.css";

const Citybuttons = ({ cities, updateCities }) => {
  return (
    <>
      <div className="buttons-group">
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => updateCities(city.name)}
            className={city.selected ? "selected-button" : ""}
          >
            {city.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Citybuttons;
