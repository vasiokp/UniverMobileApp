import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://universityapi.azurewebsites.net'
})

instance.interceptors.request.use(config => {
	const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aXRhbGl5MjAyQHVuaXZlcnNpdHkuY29tIiwianRpIjoiMjZmNTg5ZDQtNGZlNy00ZTQyLTgzODQtOWJmMjAyY2NhYzM2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IjJkNzM4ODA1LWFhZjAtNGNiZS04NTIyLWMxZDI4OTZhY2JkZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN0dWRlbnQiLCJleHAiOjE1NDQ3MzYzMjYsImlzcyI6IlVuaXZlcnNpdHlBUElBdXRoU2VydmVyIiwiYXVkIjoiVW5pdmVyc2l0eUFQSUF1dGhTZXJ2ZXIifQ.oBShLM2BDVhhQAB4MID0tmi8g9fZUqN8-5SaCUd104k'
	if (accessToken) config.headers['Authorization'] = 'Bearer ' + accessToken
	return config
})

export default instance
