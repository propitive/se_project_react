import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import {
  getForecastWeather,
  handleRetrieveSunrise,
  handleRetrieveSunset,
  handleRetriveType,
} from "../utils/weatherApi";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  const currentTemperatureUnit = React.useContext(
    CurrentTemperatureUnitContext
  );
  const [apiWeatherType, setApiWeatherType] = useState("sunny");
  const [sunriseValue, setSunriseValue] = useState(0);
  const [sunsetValue, setSunsetValue] = useState(0);

  const weatherTempString = weatherTemp.toString();
  const weatherTempStringArray = weatherTempString.split("°", 2);
  const weatherTempStringNumber = +weatherTempStringArray[0];

  const getWeatherTypeFarenheit = () => {
    if (weatherTempStringNumber >= 86) {
      return "hot";
    } else if (weatherTempStringNumber >= 66 && weatherTempStringNumber <= 85) {
      return "warm";
    } else if (weatherTempStringNumber <= 65) {
      return "cold";
    }
  };

  const getWeatherTypeCelsius = () => {
    if (weatherTempStringNumber >= 30) {
      return "hot";
    } else if (weatherTempStringNumber >= 18 && weatherTempStringNumber <= 29) {
      return "warm";
    } else if (weatherTempStringNumber <= 17) {
      return "cold";
    }
  };

  const getWeatherType = () => {
    if (currentTemperatureUnit.currentTemperatureUnit === "F") {
      return getWeatherTypeFarenheit();
    }
    if (currentTemperatureUnit.currentTemperatureUnit === "C") {
      return getWeatherTypeCelsius();
    }
  };

  const weatherType = getWeatherType();

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  useEffect(() => {
    getForecastWeather().then((data) => {
      const weatherType = handleRetriveType(data);
      const weatherTypeString = `${weatherType}`;
      setApiWeatherType(weatherTypeString);
    });
  });

  useEffect(() => {
    getForecastWeather().then((data) => {
      const sunrise = handleRetrieveSunrise(data);
      const sunriseInSeconds = sunrise / 1000;
      setSunriseValue(sunriseInSeconds);

      const sunset = handleRetrieveSunset(data);
      const sunsetInSeconds = sunset / 1000;
      setSunsetValue(sunsetInSeconds);
    });
  });

  return (
    <section className="main">
      <WeatherCard
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
        weatherTemp={weatherTemp}
      />
      <section className="card-section" id="card-section">
        <div className="card-section__text">
          Today is {weatherTemp} / You may want to wear this:
        </div>

        <div className="card-section__items">
          {filteredCards.map((card) => {
            return (
              <ItemCard
                key={card._id}
                card={card}
                onSelectCard={onSelectCard}
              />
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default Main;
