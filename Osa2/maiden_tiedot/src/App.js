import { useState, useEffect } from "react"
import countryServices from "./services/countries"

const Countries = ({reducedCountryList, setSingleCountryInfo, setReducedCountryList, setSearchValue, messageValue  }) => {

  if (reducedCountryList.length > 10 || reducedCountryList.length === 0 ){
    return (
      <>
        {messageValue}
      </>
    )
  }
  else if (reducedCountryList.length === 1){
    return null
  }
  return (
    <>
      {reducedCountryList.map(country => 
        <Country country={country} key={country.name.common} setSingleCountryInfo={setSingleCountryInfo} setReducedCountryList={setReducedCountryList} setSearchValue={setSearchValue}/>
      )}
    </>
  )
}

const Country = ({country, setSingleCountryInfo, setReducedCountryList, setSearchValue}) => {

  return (
    <div>
      {country.name.common} <button onClick={(event) => {
        setSingleCountryInfo(country);
        setReducedCountryList([]);
        setSearchValue("");
        event.preventDefault();
        }} >show</button>
    </div>
  )
}

const SingleCountry = ({country, weather}) => {
  if (country !== null){
  console.log("single function");
  console.log("country:", country);
  const languagesArray = Object.values(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages:</h2>
      <ul>
        {languagesArray.map(langName => <li key={langName}>{langName}</li>)}
      </ul>
      <div><img src={country.flags.png} alt={country.flags.alt}></img></div>

      <WeatherInfo country={country} weather={weather} />
    </div>
  )}
}

const WeatherInfo = ({country, weather}) => {

  if (weather.length !== 0 ){
  console.log("tiedot mitä' tarvitaan, coordit ja api: ", process.env.REACT_APP_SECRET_API_KEY_OPNWEA);
  // console.log("coordit: ", country.capitalInfo.latlng[0] , country.capitalInfo.latlng[1]);

  console.log("printing the weather info: ", weather)

  // const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_SECRET_API_KEY_OPNWEA}`
  // const api_url = "https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1"

  // https://openweathermap.org/img/wn/10d@2x.png
  // const weatherInfo = countryServices.getWeather(api_url);

  const iconAddress = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
      <div>
        <h1>Weather in {country.capital} </h1>

        <p>Temperature is: {weather.main.temp}</p>
        <div><img src={iconAddress} alt={weather.weather[0].description}></img></div>
        <p>Wind is: {weather.wind.speed} m/s</p>
      </div>
    )
  }
}


const App = () => {

  const [allCountries, setAllCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [messageValue, setMessageValue] = useState("initializing...");
  const [reducedCountryList, setReducedCountryList] = useState([]);
  const [singleCountryInfo, setSingleCountryInfo] = useState(null);
  const [weatherInfo, setWeatherInfo ] = useState([]);

  useEffect(() => {
    countryServices
      .getAll()
      .then(initialCountries => {
        setAllCountries(initialCountries);
        console.log("all countries use effect: ", initialCountries);
        // setMessageValue(`Currently ${initialCountries.length} countries in database`);
        setMessageValue(null);
      })
  },[])

  const handleSearchChange = (event) => {
    console.log("search change handle");
    setSingleCountryInfo(null);
    // console.log(event.target.value);
    setSearchValue(event.target.value);
    const filteredList = allCountries.filter((country) => {
      // console.log("country name: ", country.name.common);
      if (country.name.common.toLowerCase().includes(event.target.value.toLowerCase())){
        return country.name.common
      }
      return null
    })

    const countryCount = filteredList.length;
    // console.log("filtered list: ", filteredList)
    setReducedCountryList(filteredList);
    if (countryCount > 10 ){
      setMessageValue(`Currently ${countryCount} countries with search, please narrow down search`);
    }
    else if (countryCount === 0 ){
      setMessageValue(`Currently ${countryCount} countries with search, please expand search params`);
    }
    else if (countryCount === 1 ){
      setSingleCountryInfo(filteredList[0]);
      setMessageValue(null);
      const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${filteredList[0].capitalInfo.latlng[0]}&lon=${filteredList[0].capitalInfo.latlng[1]}&units=metric&appid=${process.env.REACT_APP_SECRET_API_KEY_OPNWEA}`
      countryServices
        .getWeather(api_url)
        .then(fetchedWeather => {
          console.log("weather info: ", fetchedWeather);
          setWeatherInfo(fetchedWeather);
        })
    }
    else {
      setMessageValue(null);
    }
  }

  // winowsissa temp api keyn asetus
  // set "REACT_APP_API_KEY=abcdef3242342" && npm start
  const api_key_run = process.env.REACT_APP_API_KEY
  const api_key_env = process.env.REACT_APP_NOT_SECRET_CODE
  const api_key_opn_wea = process.env.REACT_APP_SECRET_API_KEY_OPNWEA
  console.log("run env api key tieto: ", api_key_run)
  console.log("env api key tieto: ", api_key_env)
  console.log("env api open weather key tieto: ", api_key_opn_wea)


  return (
    <form >
      <div>
        name: <input value={searchValue} onChange={handleSearchChange} />
      </div>
      <div>
        <Countries reducedCountryList={reducedCountryList} messageValue={messageValue} setSingleCountryInfo={setSingleCountryInfo} setReducedCountryList={setReducedCountryList} setSearchValue={setSearchValue} />
      </div>
      <div>
        <SingleCountry country={singleCountryInfo} weather={weatherInfo} />
      </div>
    </form>
  );
}

export default App;
