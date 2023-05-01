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
  return Math.ceil(temperature);
}

export function parseWeatherLocation(data) {
  const city = data.name;
  return city;
}
