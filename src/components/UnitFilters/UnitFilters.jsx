import React from "react";
import "./UnitFilters.css";

const UnitFilters = ({ temperatureUnit, updateTemperatureUnit }) => {
  return (
    <>
      <div className="buttons-group">
        {temperatureUnit.map((unit) => (
          <button
            key={unit.name}
            onClick={() => updateTemperatureUnit(unit.name)}
            className={unit.selected ? "selected-button" : ""}
          >
            {unit.name} - {unit.symbol}
          </button>
        ))}
      </div>
    </>
  );
};

export default UnitFilters;
