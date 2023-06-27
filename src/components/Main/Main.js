import React, { useContext, useState, useEffect } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnit";
import {
  getForecastWeather,
  handleRetriveType,
  handleRetrieveSunrise,
  handleRetrieveSunset,
} from "../../utils/weatherApi";
import CurrentUserContext from "../../context/CurrentUserContext";

function Main({ cards, weatherData, onCardClick, onCardLike }) {
  const actualWeather = weatherData.temperature;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = React.useContext(CurrentUserContext);
  const [apiWeatherType, setApiWeatherType] = useState("sunny");
  const [sunriseValue, setSunriseValue] = useState(0);
  const [sunsetValue, setSunsetValue] = useState(0);

  const weatherType = () => {
    if (actualWeather >= 86) {
      return "hot";
    } else if (actualWeather >= 66 && actualWeather < 85) {
      return "warm";
    } else if (actualWeather <= 65) {
      return "cold";
    }
  };

  const filterCard = cards;

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const weatherType = handleRetriveType(data);
        const weatherTypeString = `${weatherType}`;
        setApiWeatherType(weatherTypeString);

        const sunrise = handleRetrieveSunrise(data);
        const sunriseInSeconds = sunrise / 1000;
        setSunriseValue(sunriseInSeconds);

        const sunset = handleRetrieveSunset(data);
        const sunsetInSeconds = sunset / 1000;
        setSunsetValue(sunsetInSeconds);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        day={
          sunriseValue < Date.now() && Date.now() > sunsetValue ? true : false
        }
        type={
          apiWeatherType !== "cloudy" ||
          "fog" ||
          "rain" ||
          "snow" ||
          "storm" ||
          "sunny"
            ? "sunny"
            : "sunny"
        }
      />
      <section className="main__clothes">
        <div className="main__info">
          <div className="main__description-container">
            Today is{" "}
            {currentTemperatureUnit === "F"
              ? `${Math.round(actualWeather)} °F `
              : `${Math.round(((actualWeather - 32) * 5) / 9)} °C `}
            {weatherType()} / You may want to wear
          </div>
        </div>
        <ul className="main__items">
          {Array.isArray(filterCard) &&
            currentUser !== null &&
            filterCard.map((card, index) => (
              <ItemCard
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
