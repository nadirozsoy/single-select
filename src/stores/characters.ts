import { characters as charactersApi } from '@/services'
import type { IState } from '@/types'
import { defineStore } from 'pinia'

export const useCharactersStore = defineStore('characters', {
  state: (): IState => ({
    characters: []
  }),
  getters: {
    getCharacters(): any[] {
      return this.characters
    }
  },
  actions: {
    async setCharacters(page?: number | null, name?: string | null): Promise<any> {
      const { data: response } = await charactersApi.getCharacters(page, name)
      this.characters = [...this.characters, ...response.results]
      return response
    },
    clearCharacters() {
      this.characters = []
    }
  }
})
