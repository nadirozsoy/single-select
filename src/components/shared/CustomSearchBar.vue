<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import useSearchHistory from '@/composables/useSearchHistory'
import { cn } from '@/lib/utils'
import { X } from 'lucide-vue-next'

const { addSearchHistory, loadSearchHistory, clearSearchHistory } = useSearchHistory()
const search = ref('')
const result = ref('')
const emit = defineEmits(['search'])

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Arama yap'
  },
  className: {
    type: String,
    default: ''
  }
})
const handleSearch = () => {
  emit('search', search.value)
  addSearchHistory(search.value)
  result.value = search.value
}
const handleClear = () => {
  search.value = ''
  result.value = ''
  emit('search', null)
  clearSearchHistory()
}

onMounted(() => loadSearchHistory())
</script>
<template>
  <div :class="cn('flex text-sm max-w-lg flex-wrap items-center gap-3', props.className)">
    <div class="flex">
      <input
        v-model="search"
        :placeholder="`${props.placeholder}`"
        @keydown.enter="handleSearch"
        class="rounded-l-lg px-4"
      />

      <button @click="handleSearch" class="bg-slate-500 p-2 rounded-r-lg text-white">Search</button>
    </div>
    <span
      v-show="result"
      class="hover:bg-slate-700 line-clamp-1 max-w-lg cursor-pointer whitespace-nowrap p-2 bg-slate-900 text-white rounded-lg transition-all flex items-center"
      @click="handleClear"
    >
      {{ result }}
      <X :size="16" />
    </span>
  </div>
</template>
