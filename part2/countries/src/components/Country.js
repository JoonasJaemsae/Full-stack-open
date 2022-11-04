import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, languages }) => {

  const [languageArray, setLanguageArray] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const q = country.capital
    const appid = process.env.REACT_APP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${appid}`
    axios
      .get(url)
      .then(response => {
        setWeatherData(response.data)
        setIsLoading(false)
      }).catch(error => {
        console.error(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const languagesJSON = JSON.stringify(languages)
    const myObj = JSON.parse(languagesJSON)
    let arrayAsString = "";
    for (const x in myObj) {
      arrayAsString += myObj[x] + ","
    }
    const newArray = (arrayAsString.split(",")).slice(0, -1) // We are removing the last element from the array, which is an empty string.
    setLanguageArray(newArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetching the icon image takes so long, that we'll want to not proceed 
  // and instead render 'Loading' or some such message over and over until 
  // we have all the data. Otherwise we'll end up with an error message saying
  // "Cannot read properties of undefined (reading '0')" when trying to read
  // the expression weatherData.weather[0].icon below too early.
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (weatherData) {
    const icon = weatherData.weather[0].icon
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
    return (
      <div>
        <div>
          <h2>{country.name.common}</h2>
        </div>
        <p>
          capital {country.capital}<br />
          area {country.area}
        </p>
        <div>
          <h3>languages:</h3>
          <ul>
            {languageArray.map((language, key) =>
              <li key={key}>{language}</li>
            )}
          </ul>
          <img src={country.flags.png} style={{ height: "120px" }} alt="Flag of '{country.name.common}'"></img>
        </div>
        <div>
          <h3>Weather in {country.capital}</h3>
          temperature {weatherData.main?.temp} Celsius
        </div>
        <div>
          <img src={iconURL} alt="Icon for weather" />
        </div>
        <div>
          wind {weatherData.wind?.speed} m/s
        </div>
      </div >
    )
  }
}

export default Country