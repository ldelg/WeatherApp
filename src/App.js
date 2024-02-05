import React from "react";
import WeatherPage from "./components/WeatherPage/WeatherPage";
import { WeatherDataProvider } from "./components/WeatherProviders/WeatherDataProvider";

const App = () => {
  return (
    <>
      <WeatherDataProvider>
        <WeatherPage />
      </WeatherDataProvider>
    </>
  );
};

export default App;
