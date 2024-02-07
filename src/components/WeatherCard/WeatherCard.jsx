import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ getTemperatureSymbol, name, country, item }) => {
  const {
    dt_txt,
    description,
    icon,
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
  } = item;

  return (
    <div className="card-container">
      {description ? (
        <>
          <div className="description">{description}</div>
          <div className="location">
            {name}, {country} - {dt_txt}
          </div>
          <div className="line"></div>
          <div className="lower-container">
            <img src={icon} alt="Weather" className="image" />
            <div className="temperatures">
              <div className="temperature">
                {temp} {getTemperatureSymbol().symbol}
              </div>
              <div className="feels-like">
                Feels like: {feels_like} {getTemperatureSymbol().symbol}
              </div>
              <div className="min-max">
                Max: {temp_max} {getTemperatureSymbol().symbol}
              </div>
              <div className="min-max">
                Min: {temp_min} {getTemperatureSymbol().symbol}
              </div>
            </div>
          </div>
          <div className="humidity">Humidity: {humidity}%</div>
        </>
      ) : (
        <p>Data couldn't get fetched</p>
      )}
    </div>
  );
};

export default WeatherCard;
