import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data})
  }
  
  const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

const deletePerson = (person) => {
  const deleteUrl = `${baseUrl}/${person.id}`
  // console.log("delete: ", deleteUrl)
  if(window.confirm(`do you want to delete ${person.name} ${person.number}?`)){
    axios.delete(deleteUrl)
    window.alert(`Deleted: ${person.name} ${person.number}`)
    return true
  }
  return false
}

  const methods = { getAll, create, deletePerson }
  export default methods