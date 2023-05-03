import { latitude, longitude, APIkey } from "./constants";

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export function getForecastWeather() {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
  return weatherApi;
}

export function parseWeatherData(data) {
  const main = data.main;
  const temperature = main && main.temp;
  return Math.ceil(temperature);
}

export function parseWeatherLocation(data) {
  const city = data.name;
  return city;
}
