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
  <div :class="cn('flex max-w-lg flex-wrap items-center gap-3 text-sm', props.className)">
    <div class="flex">
      <input
        v-model="search"
        :placeholder="`${props.placeholder}`"
        @keydown.enter="handleSearch"
        class="rounded-l-lg px-4"
      />

      <button @click="handleSearch" class="rounded-r-lg bg-slate-500 p-2 text-white">Search</button>
    </div>
    <span
      v-show="result"
      class="line-clamp-1 flex max-w-lg cursor-pointer items-center whitespace-nowrap rounded-lg bg-slate-900 p-2 text-white transition-all hover:bg-slate-700"
      @click="handleClear"
    >
      {{ result }}
      <X :size="16" />
    </span>
  </div>
</template>
