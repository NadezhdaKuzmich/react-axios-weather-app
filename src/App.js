import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState("");
  const [error, setError] = useState("");

  const key = "48bc45b5b2e0f7c5e3582546ec5bdd92";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}`;

  const serchWeather = (e) => {
    if (e.key === "Enter") {
      setError("");
      axios
        .get(url)
        .then((response) => setData(response.data))
        .catch((e) => {
          setError("You entered the wrong city name");
        });
      setTown("");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="input-field">
          <input
            type="text"
            value={town}
            placeholder="Enter location"
            onChange={(e) => setTown(e.target.value)}
            onKeyDown={serchWeather}
          />
          <span className="error-msg">{error}</span>
        </div>
        {data.main ? (
          <div className="weather-info">
            <div className="main-info">
              <p className="city">{data.name}</p>
              <p className="temp bold">{data.main.temp.toFixed()}°C</p>
              <p className="description">{data.weather[0].main}</p>
            </div>
            <div className="additional-info">
              <div className="feels">
                <p className="additional-data bold">
                  {data.main.feels_like.toFixed()}°C
                </p>
                <p>Відчувається як</p>
              </div>
              <div className="humidity">
                <p className="additional-data bold">{data.main.humidity}%</p>
                <p>Вологість</p>
              </div>
              <div className="wind">
                <p className="additional-data bold">{data.wind.speed} M/С</p>
                <p>Швидкість вітру</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;