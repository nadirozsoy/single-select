import apiClient from '@/config/apiClient'

export default {
  getCharacters(page?: number | null, name?: string | null) {
    return apiClient.get('/character', {
      params: {
        page,
        name
      }
    })
  }
}
