import axios from 'axios'

var instance = axios.create({
  baseURL: 'https://universityapi.azurewebsites.net'
})

export default instance
