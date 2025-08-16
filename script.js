const apiKey = "e7fd4c3d2cab4187b29105747252207";
const output = document.getElementById('output');
const errorDiv = document.getElementById('error');
const input = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');

async function fetchWeather(url) {
  output.innerHTML = "⏳ Fetching weather...";
  errorDiv.textContent = "";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Location not found");
    const data = await response.json();

    const city = data.location.name;
    const country = data.location.country;
    const tempC = data.current.temp_c;
    const feelsLike = data.current.feelslike_c;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    let forecastHTML = "";
    if(data.forecast) {
      data.forecast.forecastday.forEach(day => {
        forecastHTML += `
          <div>
            <strong>${day.date}</strong>:
            🌡️ ${day.day.avgtemp_c}°C,
            🌤️ ${day.day.condition.text}
          </div>
        `;
      });
    }

    output.innerHTML = `
      <div class="fade-in">
        <img src="https:${icon}" class="icon" alt="Weather Icon"/>
        <strong>${city}, ${country}</strong><br>
        🌡️ Temp: <b>${tempC}°C</b><br>
        🌡️ Feels like: <b>${feelsLike}°C</b><br>
        💧 Humidity: <b>${humidity}%</b><br>
        🌬️ Wind: <b>${wind} kph</b><br>
        🌤️ Condition: <b>${condition}</b>
        ${forecastHTML ? "<h3>3-Day Forecast:</h3>" + forecastHTML : ""}
      </div>
    `;
  } catch(err) {
    output.innerHTML = "";
    errorDiv.textContent = "⚠️ Error: " + err.message;
  }
}

async function getWeather() {
  const location = input.value.trim();
  if (!location) {
    errorDiv.textContent = "⛔ Please enter a location.";
    return;
  }
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=3&aqi=yes&alerts=yes`;
  fetchWeather(url);
}

function getGeoWeather() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3&aqi=yes&alerts=yes`;
      fetchWeather(url);
    }, () => {
      errorDiv.textContent = "⛔ Unable to fetch your location.";
    });
  } else {
    errorDiv.textContent = "⛔ Geolocation is not supported by this browser.";
  }
}

searchBtn.addEventListener('click', getWeather);
geoBtn.addEventListener('click', getGeoWeather);
input.addEventListener('keypress', e => { if(e.key === 'Enter') getWeather(); });
