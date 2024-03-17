import { computed, ref } from 'vue'

const searchHistoryArray: any = ref([])

export default function useSearchHistory() {
  const searchHistory = localStorage.getItem('searchHistory') && localStorage.getItem('searchHistory')
  searchHistoryArray.value = searchHistory ? JSON.parse(searchHistory) : []

  const addSearchHistory = (search: any) => {
    if (searchHistoryArray.value.includes(search)) return
    if (search === '') return
    searchHistoryArray.value = [search, ...searchHistoryArray.value]
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArray.value))
  }
  const clearSearchHistory = () => {
    searchHistoryArray.value = []
    localStorage.setItem('searchHistory', JSON.stringify([]))
  }

  const loadSearchHistory = () => {
    searchHistoryArray.value = localStorage.getItem('searchHistory') || []
  }

  const history = computed(() => {
    return searchHistoryArray.value.slice(0, 6)
  })

  return { history, addSearchHistory, loadSearchHistory, clearSearchHistory }
}
