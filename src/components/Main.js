import { useMemo } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { defaultClothingItems } from "../util/constants";

function Main({ weatherTemp, onSelectCard }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <section className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={weatherTemp} />
      <section className="card-section" id="card-section">
        Today is {weatherTemp}°F / You may want to wear this:
        <div className="card-section__items">
          {filteredCards.map((x) => {
            return <ItemCard x={x} onSelectCard={onSelectCard} />;
          })}
        </div>
      </section>
    </section>
  );
}

export default Main;
