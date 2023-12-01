import "./App.css";
import axios from "axios";
import React, { useState } from "react";

export default function App() {
  let [city, setCity] = useState("");
  let [text, setText] = useState("");
  let [title, setTitle] = useState("");
  let [pic, setPic] = useState("");

  function showWeather(response) {
    setTitle(
      <div>
        {response.data.name}, {response.data.sys.country}
      </div>
    );
    setText(
      <div>
        <div>Temperature: {Math.round(response.data.main.temp)} ℃ </div>
        <div>Description: {response.data.weather[0].description}</div>
        <div>Humidity: {response.data.main.humidity}%</div>
        <div>Wind: {Math.round(response.data.wind.speed)} km/h</div>
      </div>
    );
    setPic(
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6bcb5d2bdae98533196671a7efe92e7a&units=metric`;
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="theWeather">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={updateCity}
          placeholder="Type the name of the city"
        />
        <input type="submit" value="Search" className="searchButton" />
      </form>
      <h2>{title}</h2>
      <div>{text}</div>
      <div>
        <img src={pic} alt="" />
      </div>
    </div>
  );
}
