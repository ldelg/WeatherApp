import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = createContext();

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};

export const WeatherDataProvider = ({ children }) => {
  const APIkey = "75ef4a45b0a365a82a6be3f3ea598ffc";

  //Filters

  const [filtersState, setFilterState] = useState({
    temperatureUnit: [
      { name: "metric", symbol: "C°", selected: true },
      { name: "imperial", symbol: "°K", selected: false },
      { name: "standard", symbol: "°F", selected: false },
    ],
    cities: [
      { name: "current-position", selected: false },
      { name: "London", selected: true },
      { name: "Tokyo", selected: false },
      { name: "Florence", selected: false },
      { name: "Barcelona", selected: false },
    ],
    daysButtons: [],
  });

  const addCity = (newCity) => {
    setFilterState((prevSettings) => ({
      ...prevSettings,
      cities: [...prevSettings.cities, { ...newCity, selected: false }],
    }));
  };

  const handleDeleteCity = (city) => {
    setFilterState((prevSettings) => {
      const newCities = prevSettings.cities.filter(
        (cityNew) => cityNew.name !== city.name
      );

      if (city.selected) {
        newCities[newCities.length - 1].selected = true;
      }

      return { ...prevSettings, cities: newCities };
    });
  };

  const updateCities = (cityName) => {
    setFilterState((prevSettings) => ({
      ...prevSettings,
      cities: prevSettings.cities.map((city) => ({
        ...city,
        selected: city.name === cityName,
      })),
    }));
  };

  const updateTemperatureUnit = (unitName) => {
    setFilterState((prevSettings) => ({
      ...prevSettings,
      temperatureUnit: prevSettings.temperatureUnit.map((unit) => ({
        ...unit,
        selected: unit.name === unitName,
      })),
    }));
  };

  const getTemperatureSymbol = () => {
    return filtersState.temperatureUnit.find((unit) => unit.selected);
  };

  //General Weather Data

  const [weatherData, setWeatherData] = useState({
    name: "",
    country: "",
    list: [
      {
        description: "",
        temp: "",
        feels_like: "",
        temp_max: "",
        temp_min: "",
        humidity: "",
        dt_txt: "",
      },
    ],
  });

  const getWeatherData = async () => {
    let cityOrLocationURL;

    if (filtersState.cities[0].selected) {
      try {
        const location = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        cityOrLocationURL = `lat=${location.coords.latitude}&lon=${location.coords.longitude}`;
      } catch (error) {
        if (error.code === 1) {
          alert(
            "It looks like the geolocation is blocked by your settings. Please adjust them and try again."
          );
        }
        console.error("Error fetching geolocation:", error);
        return;
      }
    } else {
      cityOrLocationURL = `q=${
        filtersState.cities.find((city) => city.selected).name
      }`;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?${cityOrLocationURL}&appid=${APIkey}&units=${
          getTemperatureSymbol().name
        }`
      );

      const res = response.data;
      const list = res.list.map((ele, idx) => ({ ...ele, index: idx }));

      setFilterState((prevSettings) => ({
        ...prevSettings,
        daysButtons: [
          ...new Set(list.map((item) => item.dt_txt.split(" ")[0])),
        ].map((day) => ({
          day,
          weather: list.filter((ele) => ele.dt_txt.slice(0, 10) === day),
        })),
      }));

      const weatherDataList = list.map((item) => ({
        description: item.weather[0].description,
        temp: item.main.temp,
        feels_like: item.main.feels_like,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        humidity: item.main.humidity,
        dt_txt: new Date(item.dt_txt).toLocaleString(),
      }));

      setWeatherData({
        name: res.city.name,
        country: res.city.country,
        list: weatherDataList,
      });
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        alert("Oops, looks like the place you are looking for may not exist, look for typos and try again");
      }
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [filtersState.temperatureUnit, filtersState.cities]);

  const contextValue = {
    weatherData,
    filtersState,
    updateTemperatureUnit,
    getTemperatureSymbol,
    updateCities,
    handleDeleteCity,
    addCity,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};
