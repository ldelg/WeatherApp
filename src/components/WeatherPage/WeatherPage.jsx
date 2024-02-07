import React, { useState } from "react";
import { useWeatherContext } from "../WeatherProviders/WeatherDataProvider";
import "./WeatherPage.css";
import UnitFilters from "../UnitFilters/UnitFilters";
import Citybuttons from "../CityButtons/Citybuttons";
import WeatherCard from "../WeatherCard/WeatherCard";
import DaysFilters from "../DaysFilters/DaysFilters";

const WeatherPage = () => {
  const {
    weatherData,
    filtersState,
    updateTemperatureUnit,
    getTemperatureSymbol,
    updateCities,
    handleDeleteCity,
    addCity,
  } = useWeatherContext();

  const { temperatureUnit, cities, daysButtons } = filtersState;
  const { name, country, list } = weatherData;

  const [idx, setIdx] = useState(0);

  return (
    <>
      <div className="container">
        <div className="buttons-layout">
          <div className="first-layout-row">
            <Citybuttons
              cities={cities}
              updateCities={updateCities}
              handleDeleteCity={handleDeleteCity}
              addCity={addCity}
            />
            <UnitFilters
              temperatureUnit={temperatureUnit}
              updateTemperatureUnit={updateTemperatureUnit}
            />
          </div>
          {daysButtons.length > 0 ? (
            <DaysFilters daysButtons={daysButtons} setIdx={setIdx} />
          ) : ("")}
        </div>
        <WeatherCard
          getTemperatureSymbol={getTemperatureSymbol}
          name={name}
          country={country}
          item={list[idx]}
        />
      </div>
    </>
  );
};

export default WeatherPage;
