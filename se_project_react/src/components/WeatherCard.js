const weatherOptions = [
  {
    url: require("../images/weatherConditions/day/sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../images/weatherConditions/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../images/weatherConditions/night/sunny.svg").default,
    day: false,
    type: "sunny",
  },
  {
    url: require("../images/weatherConditions/night/cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
];

function WeatherCard({ day, type, weatherTemp = "" }) {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";
  console.log(imageSrcUrl);

  return (
    <>
      <section className="weather" id="header">
        <div className="weather-info">{weatherTemp}</div>
        <img src={imageSrcUrl} alt="weather-app" className="weather-image" />
      </section>
    </>
  );
}

export default WeatherCard;
