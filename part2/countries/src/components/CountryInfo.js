import { useEffect, useState } from "react";
import axios from "axios";

const kelvinToCelcius = (temp) => Math.round(temp-273,15);

const CountryInfo = ({country}) => {
    const [weather, setWeather]=useState(`notDownloaded`);
    const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&APPID=${process.env.REACT_APP_API_KEY}`;
    useEffect(() => {
        axios
          .get(apiLink)
          .then(response => {
            setWeather(response.data);
          })
      }, [apiLink])

    return(
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.keys(country.languages).map(oKey => <li key={oKey}>{country.languages[oKey]}</li>)}
          </ul>      
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
          <h2>Weather in {country.capital[0]}</h2>  
          <div>{weather!==`notDownloaded` && `Temperature: ${kelvinToCelcius(weather.main.temp)}°C` }</div>
            {weather!==`notDownloaded` && 
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`Weather of ${country.name.common}`}/>
            }
 
        <div>{weather!==`notDownloaded` && `  Wind: ${weather.wind.speed} m/s` }</div>
        </div>
      )
}
 
export default CountryInfo;