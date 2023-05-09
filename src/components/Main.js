import React, { useEffect } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { defaultClothingItems } from "../utils/constants";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard }) {
  const currentTemperatureUnit = React.useContext(
    CurrentTemperatureUnitContext
  );
  console.log(currentTemperatureUnit);

  const weatherTempString = weatherTemp.toString();
  const weatherTempStringArray = weatherTempString.split("°", 2);
  const weatherTempStringNumber = +weatherTempStringArray[0];
  console.log(weatherTempStringNumber);

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
    if (currentTemperatureUnit === "F") {
      return getWeatherTypeFarenheit;
    }
    if (currentTemperatureUnit === "C") {
      return getWeatherTypeCelsius;
    }
  };

  const weatherType = function () {
    return getWeatherType();
  };
  console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((item) => {
    // return item.weather.toLowerCase() === weatherType;
    return (
      item.weather.toLowerCase() ===
      (currentTemperatureUnit === "F"
        ? getWeatherTypeFarenheit()
        : getWeatherTypeCelsius())
    );
  });

  // useEffect(() => {
  //   const weatherType = getWeatherType();
  //   const filteredCards = defaultClothingItems.filter((item) => {
  //     return item.weather.toLowerCase() === weatherType;
  //   });

  //   return () => {
  //     filteredCards;
  //   };
  // });

  return (
    <section className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={weatherTemp} />
      <section className="card-section" id="card-section">
        Today is {weatherTemp} / You may want to wear this:
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
