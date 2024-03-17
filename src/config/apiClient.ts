import axios from 'axios'

function createUrl(path: string): string {
  return `https://rickandmortyapi.com${path}`
}

export const API_URL = createUrl('/api') as string

const apiClient = axios.create({ baseURL: API_URL, data: {} })
apiClient.interceptors.request.use(config => {
  return config
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      //message plugin or router.push('/login')
      console.log('unauthorized, logging out ...')
    }
    return Promise.reject(error.response.data)
  }
)

export default apiClient
