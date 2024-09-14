const APIKey = "70c80172e46d949e579016e939c711da";
const cityName = document.querySelector("#city");
const btn = document.querySelector("#button");
const temp = document.querySelector("#temperature");
const weatherEle = document.querySelector("#city-weather");
const time = document.querySelector("#timezone");
const cityNameEle = document.querySelector("#city-name");
const dateEle = document.querySelector("#date");
const icon = document.getElementById("temperature-icon");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
icon.innerHTML = "<i class='fa-solid fa-thermometer-half'></i>";

async function fetching(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  );
  const data = await response.json();
  return data;
}

async function getCurrentTime(lat, lon) {
  const response = await fetch(
    `https://timeapi.io/api/time/current/coordinate?latitude=${lat}&longitude=${lon}`
  );
  const data = await response.json();
  return data;
}

async function updateHTML(data, currentTimeData) {
  const temperature = data.main.temp;
  const weather = data.weather[0].description;
  const cityNameFromAPI = data.name;
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const currentTime = currentTimeData.time;

  // Format the time to include AM/PM
  const hours = currentTimeData.time.slice(0, 2);
  let amPm = "";
  if (hours < 12) {
    amPm = "AM";
  } else {
    amPm = "PM";
  }
  const formattedTime = `${currentTimeData.time} ${amPm}`;

  // Format the date correctly
  const dayOfWeek = currentTimeData.dayOfWeek;
  const day = currentTimeData.day;
  const month = months[currentTimeData.month - 1];
  const year = currentTimeData.year;
  const currentDate = `${dayOfWeek} ${day} ${month} ${year}`;

  // Update HTML elements with extracted data
  temp.textContent = `${(temperature - 273).toFixed(1)}°C`;
  weatherEle.textContent = weather;
  cityNameEle.textContent = cityNameFromAPI;
  time.textContent = formattedTime;
  dateEle.textContent = currentDate;

  // Change the icon based on the weather
  const weatherIcon = getWeatherIcon(weather);
  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weather}" style="height: 2em; width: auto">`;
}

function getWeatherIcon(weather) {
  switch (true) {
    case weather.includes("Cloud"):
      return "02d"; // Cloudy
    case weather.includes("Rain"):
      return "10d"; // Rain
    case weather.includes("Sun"):
      return "01d"; // Sunny
    case weather.includes("Snow"):
      return "13d"; // Snow
    default:
      return "02d"; // Default to cloudy
  }
}

btn.addEventListener("click", async function () {
  const city = cityName.value;
  const data = await fetching(city);
  const currentTimeData = await getCurrentTime(data.coord.lat, data.coord.lon);
  await updateHTML(data, currentTimeData);
});

cityName.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    const city = cityName.value;
    const data = await fetching(city);
    const currentTimeData = await getCurrentTime(
      data.coord.lat,
      data.coord.lon
    );
    await updateHTML(data, currentTimeData);
  }
});
