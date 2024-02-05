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
    temperatureUnit,
    updateTemperatureUnit,
    getTemperatureSymbol,
    cities,
    updateCities,
    daysButtons,
  } = useWeatherContext();
  const { name, country, list } = weatherData;

  const [idx, setIdx] = useState(0);

  return (
    <>
      <h2>Weather Information</h2>
      <div className="buttons-layout">
        <UnitFilters
          temperatureUnit={temperatureUnit}
          updateTemperatureUnit={updateTemperatureUnit}
        />
        <Citybuttons cities={cities} updateCities={updateCities} />
        <DaysFilters daysButtons={daysButtons} setIdx={setIdx} />
      </div>
      <WeatherCard
        getTemperatureSymbol={getTemperatureSymbol}
        name={name}
        country={country}
        item={list[idx]}
      />
    </>
  );
};

export default WeatherPage;
