import { useCharactersStore } from '@/stores/characters'
import type { IPagination } from '@/types'
import { computed, reactive } from 'vue'

export const useCharacters = () => {
  const charactersStore = useCharactersStore()

  const pagination: IPagination = reactive({
    page: 0,
    size: 10,
    loader: false,
    hasNext: true,
    name: null
  })

  const handleSearch = (value: string) => {
    charactersStore.clearCharacters()
    pagination.name = value
    pagination.page = 0
    pagination.hasNext = true
    handleLoadMore()
  }

  const handleLoadMore = () => {
    pagination.page++
    if (!pagination.hasNext) {
      return
    }
    pagination.loader = true
    charactersStore
      .setCharacters(pagination.page, pagination.name)
      .then((response: any) => {
        pagination.hasNext = response.info.next
      })
      .catch((error: any) => console.log(error))
      .finally(() => (pagination.loader = false))
  }

  const characters = computed(() => {
    return charactersStore.getCharacters.map((character: any) => {
      return {
        value: character.id,
        label: character.name
      }
    })
  })

  return {
    characters,
    pagination,
    handleSearch,
    handleLoadMore
  }
}
