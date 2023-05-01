// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

const latitude = 32.77;
const longitude = -96.79;
const APIkey = `44d763e20353ebef92d497833d045a80`;

export function getForecastWeather() {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });

  return weatherApi;
}

export function parseWeatherData(data) {
  const main = data.main;
  const temperature = main && main.temp;
  console.log(Math.ceil(temperature));
  return Math.ceil(temperature);
}

export function parseWeatherLocation(data) {
  const city = data.name;
  return city;
}

const test = {
  coord: {
    lon: -96.792,
    lat: 32.773,
  },
  weather: [
    {
      id: 801,
      main: "Clouds",
      description: "few clouds",
      icon: "02n",
    },
  ],
  base: "stations",
  main: {
    temp: 65.23,
    feels_like: 63.46,
    temp_min: 61.5,
    temp_max: 68.72,
    pressure: 1014,
    humidity: 43,
  },
  visibility: 10000,
  wind: {
    speed: 12.66,
    deg: 330,
  },
  clouds: {
    all: 20,
  },
  dt: 1682819319,
  sys: {
    type: 2,
    id: 2018848,
    country: "US",
    sunrise: 1682768524,
    sunset: 1682816806,
  },
  timezone: -18000,
  id: 4684904,
  name: "Dallas",
  cod: 200,
};
