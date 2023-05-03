import { weatherOptions } from "../utils/constants";

function WeatherCard({ day, type, weatherTemp = "" }) {
  const findWeather = (weatherOption) => {
    return weatherOption.day === day && weatherOption.type === type;
  };

  const weatherOption = weatherOptions.find(findWeather);

  const weatherOptionSrcUrl = weatherOption.url || "";

  return (
    <>
      <section className="weather" id="header">
        <div className="weather__info">{weatherTemp}°F</div>
        <img
          src={weatherOptionSrcUrl}
          alt="weather-app"
          className="weather__image"
        />
      </section>
    </>
  );
}

export default WeatherCard;
