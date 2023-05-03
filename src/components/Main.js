import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { defaultClothingItems } from "../utils/constants";

function Main({ weatherTemp, onSelectCard }) {
  const getWeatherType = () => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType();

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <section className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={weatherTemp} />
      <section className="card-section" id="card-section">
        Today is {weatherTemp}°F / You may want to wear this:
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
