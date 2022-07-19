import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'https://us-central1-challenge-334613.cloudfunctions.net/api/graphql',
})

export default api
