import axios from "axios"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"

const getAll = () => {
    const request = axios.get(`${baseUrl}all`);
    return request.then(response => {
        return response.data})
}

const getWeather = (weatherUrl) => {
    // console.log("weather url: ", weatherUrl);
    const request = axios.get(`${weatherUrl}`);

    return request.then(response => {
        // console.log("fetched data in service portion: ", response.data)
        return response.data})
}

const methods = { getAll, getWeather }
export default methods