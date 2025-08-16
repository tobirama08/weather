# 🌦️ Live Weather App

A responsive, user-friendly weather web application that provides **current weather conditions** and a **3-day forecast** for any location worldwide. Users can search by city or use geolocation to get weather for their current location.

## Features

- Search by city name  
- Automatic geolocation weather detection  
- Current temperature, feels-like temperature, humidity, wind speed  
- Weather condition description with icon  
- 3-day forecast display  
- Responsive design for mobile and desktop  
- Loading indicator while fetching data  
- Enter key support for quick searches  

## Tech Stack

- **HTML** – Structure  
- **CSS** – Styling and animations  
- **JavaScript** – Fetching data from API and dynamic rendering  
- **WeatherAPI** – Provides live weather data and 3-day forecast  

## Usage

1. Open the app in your browser: [Weather App](https://tobirama08.github.io/weather/)  
2. Enter a city in the input field or click **Use My Location** to detect your current weather.  
3. View current conditions and a 3-day forecast.  

## API

- This project uses [WeatherAPI](https://www.weatherapi.com/) for fetching weather data.  
- Replace the API key in `script.js` with your own if you deploy or fork the project:

```javascript
const apiKey = "YOUR_API_KEY"; // Replace with your API key
