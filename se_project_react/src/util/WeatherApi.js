// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

const latitude = 44.34;
const longitude = 10.99;
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
  console.log(main);
  const temperature = main && main.temp;
  console.log(Math.ceil(temperature));
  return Math.ceil(temperature);
}

const testResponse = {
  coord: {
    lon: 10.99,
    lat: 44.34,
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04n",
    },
  ],
  base: "stations",
  main: {
    temp: 51.06,
    feels_like: 50.38,
    temp_min: 48.25,
    temp_max: 53.42,
    pressure: 1014,
    humidity: 96,
    sea_level: 1014,
    grnd_level: 929,
  },
  visibility: 10000,
  wind: {
    speed: 0.74,
    deg: 8,
    gust: 1.83,
  },
  clouds: {
    all: 96,
  },
  dt: 1682805691,
  sys: {
    type: 2,
    id: 2004688,
    country: "IT",
    sunrise: 1682827736,
    sunset: 1682878648,
  },
  timezone: 7200,
  id: 3163858,
  name: "Zocca",
  cod: 200,
};
