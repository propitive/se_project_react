import { weatherOptions } from "../utils/constants";

function WeatherCard({ day, type, weatherTemp = "" }) {
  const findWeather = (weatherOption) => {
    return weatherOption.day === day && weatherOption.type === type;
  };

  const imageSrc = weatherOptions.find(findWeather);
  console.log(imageSrc);

  const imageSrcUrl = imageSrc.url || "";
  console.log(imageSrcUrl);

  return (
    <>
      <section className="weather" id="header">
        <div className="weather__info">{weatherTemp}°F</div>
        <img src={imageSrcUrl} alt="weather-app" className="weather__image" />
      </section>
    </>
  );
}

export default WeatherCard;
