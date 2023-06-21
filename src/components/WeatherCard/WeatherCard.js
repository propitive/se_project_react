import { useContext } from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnit";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData, day, type }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const findWeather = (weatherOption) => {
    return weatherOption.day === day && weatherOption.type === type;
  };
  const weatherOption = weatherOptions.find(findWeather);
  const weatherOptionSrcUrl = weatherOption.url || "";

  console.log(weatherOptionSrcUrl);

  return (
    <div className="weather">
      {weatherData && (
        <p className="weather__temperature">
          {currentTemperatureUnit === "F"
            ? `${Math.round(weatherData.temperature)} °F`
            : `${Math.round(((weatherData.temperature - 32) * 5) / 9)} °C`}
        </p>
      )}
      <img src={weatherOptionSrcUrl} className="weather__image" alt="Weather" />
    </div>
  );
}

export default WeatherCard;
