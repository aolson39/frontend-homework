import React, { useState, useEffect } from 'react'

const api = {
  key: "045530b3196e77c7a0aefff762653af0",
  base: "https://api.openweathermap.org/data/2.5/weather"
}

function App() {

  const [weather, setWeather] = useState({})
  const [zip, setZip] = useState(10036)
  const [toggle, switchToggle] = useState(false)
  const [sunrise, setSunrise] = useState('')
  const [sunset, setSunset] = useState('')

  let datte = new Date().toLocaleTimeString();

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch(`${api.base}?zip=${zip}&units=imperial&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setZip(result)
        setWeather(result)
        setZip('')
        setSunrise(new Date(result.sys.sunrise * 1000).toLocaleTimeString())
        setSunset(new Date(result.sys.sunset * 1000).toLocaleTimeString())
        console.log(result);
        console.log(result.main);
      });
  }

  const search = event => {
    if (event.key === "Enter") {
      getData()
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  const toggleWeather = () => {
    switchToggle(!toggle)
  }

  return (
    <div className='App'>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search Zipcode..."
            onChange={e => { setZip(e.target.value) }}
            value={zip}
            onKeyDown={search}
          />
        </div>

        {(typeof weather.main !== 'undefined') ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="current-weather">

                <div className="temp">
                  {Math.round(weather.main.temp)}°F <br />
                </div>
                <div className="weather-under">
                  <div className="weather">
                    {weather.weather[0].description} <br />
                  </div>
                  <div className="weather-range">
                    <div className="high">
                      High: {Math.round(weather.main.temp_max)}°F <br />
                    </div>
                    Low: {Math.round(weather.main.temp_min)}°F
                  </div>
                </div>
              </div>
              <div className="toggle-data">
              <button className='toggle-weather' onClick={toggleWeather}>{toggle ? 'Hide weather data' : 'More Weather Data'}</button>
                {toggle && (
                  <ul className="toggles">
                    <li>Wind Speed: {Math.round(weather.wind.speed)} mph </li>
                    <li>Humidity: {weather.main.humidity}%</li>
                    <li>Pressure: {weather.main.pressure} hPa</li>
                    <li>Sunrise: {sunrise}</li>
                    <li>Sunset: {sunset}</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
