const APIKey = "70c80172e46d949e579016e939c711da";
const cityName = document.querySelector("#city");
const btn = document.querySelector("#button");
const city = cityName.value;
async function fetching(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  );
  const data = await response.json();
  console.log(data);
}

btn.addEventListener("click", function () {
  const city = cityName.value;

  fetching(city);
});
