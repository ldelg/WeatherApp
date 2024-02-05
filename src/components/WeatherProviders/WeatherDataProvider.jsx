import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = createContext();

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};

export const WeatherDataProvider = ({ children }) => {
  const APIkey = "75ef4a45b0a365a82a6be3f3ea598ffc";

  //Temperatures

  const [temperatureUnit, setTemperatureUnit] = useState([
    { name: "metric", symbol: "C°", selected: true },
    { name: "imperial", symbol: "°K", selected: false },
    { name: "standard", symbol: "°F", selected: false },
  ]);

  const updateTemperatureUnit = (unitName) => {
    setTemperatureUnit((prevUnits) =>
      prevUnits.map((unit) => ({
        ...unit,
        selected: unit.name === unitName,
      }))
    );
  };

  const getTemperatureSymbol = () => {
    return temperatureUnit.find((unit) => unit.selected);
  };

  //Cities

  const [cities, setCities] = useState([
    { name: "current-position", selected: true },
    { name: "London", selected: false },
    { name: "Tokyo", selected: false },
    { name: "Florence", selected: false },
    { name: "Lausanne", selected: false },
    { name: "Barcelona", selected: false },
  ]);

  const updateCities = (cityName) => {
    setCities((prevCity) =>
      prevCity.map((city) => ({
        ...city,
        selected: city.name === cityName,
      }))
    );
  };

  // Days buttons

  const [daysButtons, setDaysButtons] = useState(null);  

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
        dt_txt: ""
      },
    ],
  });

  const getWeatherData = async () => {
    try {
      const location = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error)
        );
      });

      let cityOrLocationURL = cities[0].selected
        ? `lat=${location.latitude}&lon=${location.longitude}`
        : ((selectedCity) => (selectedCity ? `q=${selectedCity.name}` : ""))(
            cities.find((city) => city.selected)
          );

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?${cityOrLocationURL}&appid=${APIkey}&units=${getTemperatureSymbol().name}`
      );

      const res = response.data;
      const list = res.list.map((ele,idx)=>({...ele,index: idx}))
    
      setDaysButtons(
        [...new Set(list.map((item) => item.dt_txt.split(" ")[0]))].map((day) => {
      
          return {
            day,
            weather: list.filter((ele) => ele.dt_txt.slice(0, 10) === day),
          };
        })
      );
      
      const weatherDataList = list.map((item) => ({
        description: item.weather[0].description,
        temp: item.main.temp,
        feels_like: item.main.feels_like,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        humidity: item.main.humidity,
        dt_txt: new Date(item.dt_txt).toLocaleString()
      }));

      setWeatherData({
        name: res.city.name,
        country: res.city.country,
        list: weatherDataList,
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [temperatureUnit, cities]);

  const contextValue = {
    weatherData,
    temperatureUnit,
    updateTemperatureUnit,
    getTemperatureSymbol,
    cities,
    updateCities,
    daysButtons
    };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};
