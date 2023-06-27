import { useState, useEffect } from "react"
import countryServices from "./services/countries"

const Countries = ({messageValue, reducedCountryList}) => {
  // console.log("countries lenght: ", reducedCountryList.length)
  // console.log("singel country fro list: ",reducedCountryList[0]);
  if (reducedCountryList.length === 1) {
    return (
      <SingleCountry country={reducedCountryList[0]} key={reducedCountryList[0].name.common}/>
    )
  }
  else if (reducedCountryList.length > 10 || reducedCountryList.length === 0 ){
    return (
      <div>
        {messageValue}
      </div>
    )
  }
  return (
    <>
      {reducedCountryList.map(country => 
        <Country country={country} key={country.name.common}/>
      )}
    </>
  )
}

const Country = ({country}) => {

  return (
    <div>
      {country.name.common}
    </div>
  )
}

const SingleCountry = ({country}) => {
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
    </div>
  )
}


const App = () => {

  const [allCountries, setAllCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [messageValue, setMessageValue] = useState("initializing...");
  const [reducedCountryList, setReducedCountryList] = useState([]);

  useEffect(() => {

    countryServices
      .getAll()
      .then(initialCountries => {
        setAllCountries(initialCountries);
        console.log("all countries use effect: ", initialCountries);
        setMessageValue(`Currently ${initialCountries.length} countries in database`);
      })
  },[])

  const handleSearchChange = (event) => {
    // console.log(event.target.value);
    setSearchValue(event.target.value);
    const filteredList = allCountries.filter((country) => {
      // console.log("country name: ", country.name.common);
      if (country.name.common.includes(event.target.value)){
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

  }

  return (
    <form >
      <div>
        name: <input value={searchValue} onChange={handleSearchChange} />
      </div>
      {/* <div>
        {messageValue}
      </div> */}
      <div>
        <Countries reducedCountryList={reducedCountryList} messageValue={messageValue} />
      </div>
    </form>
  );
}

export default App;
