import { latitude, longitude } from "./constants";

const APIkey = "44d763e20353ebef92d497833d045a80";
const getForecastWeather = async () => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  );
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const filterDataFromWeatherApi = (data) => {
  if (!data) {
    return null;
  }

  const weather = {};

  weather.city = data.name;
  weather.temperature = data.main.temp;
  weather.condition = () => {
    if (data.main.temp >= 86) {
      return "hot";
    } else if (data.main.temp >= 66 && data.main.temp < 85) {
      return "warm";
    } else if (data.main.temp <= 65) {
      return "cold";
    }
  };
  return weather;
};

function handleRetriveType(data) {
  const weather = data.weather;
  const weatherType = weather[0].main;
  return weatherType;
}

function handleRetrieveSunrise(data) {
  const sys = data.sys;
  const sunrise = sys.sunrise;
  return sunrise;
}

function handleRetrieveSunset(data) {
  const sys = data.sys;
  const sunset = sys.sunset;
  return sunset;
}

export {
  getForecastWeather,
  filterDataFromWeatherApi,
  handleRetriveType,
  handleRetrieveSunrise,
  handleRetrieveSunset,
};
