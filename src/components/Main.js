import React, { useEffect } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { defaultClothingItems } from "../utils/constants";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  const currentTemperatureUnit = React.useContext(
    CurrentTemperatureUnitContext
  );

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

  return (
    <section className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={weatherTemp} />
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
