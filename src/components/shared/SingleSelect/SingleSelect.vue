<script setup lang="ts">
import { useClickOutside } from '@/composables/useClickOutside'
import { ChevronDown, Loader2 } from 'lucide-vue-next'
import { ref, type Ref } from 'vue'
import InfiniteScroll from '../InfiniteScroll.vue'
import ListItem from './ListItem.vue'

interface Option {
  label: string
  value: number
}

type ISingleSelect = {
  options: Option[]
  placeholder: string
  defaultValue?: Option | null
  pagination: {
    page?: number
    size?: number
    loader?: boolean
    hasNext?: boolean
    search?: string | null
  }
}

const props = defineProps<ISingleSelect>()

const emit = defineEmits(['update:value', 'loadMoreOptions', 'search'])

const isOpen = ref(false)
const selectedOption: Ref<Option | null> = ref(null)
const singleSelect: Ref<HTMLDivElement | null> = ref(null)
const searchTerm: Ref<string> = ref('')

const selectOption = (option: Option) => {
  selectedOption.value = option
  emit('update:value', option.value)
  isOpen.value = false
}

const handleToggleSelect = () => {
  isOpen.value = !isOpen.value
}

const handlePageItems = () => {
  emit('loadMoreOptions')
}

const handleSearch = (search: string) => {
  emit('search', search)
  searchTerm.value = search
  isOpen.value = true
}

const handleOpenList = (e: KeyboardEvent) => {
  const isEscapeKey = e.key === 'Escape'
  const isEnterKey = e.key === 'Enter'

  if (isEscapeKey) {
    isOpen.value = false
  } else if (isEnterKey) {
    isOpen.value = true
  }
}

useClickOutside(singleSelect, () => {
  isOpen.value = false
})
</script>

<template>
  <div ref="singleSelect" class="relative w-full">
    <div
      @click="handleToggleSelect"
      class="w-full pl-7 pr-4 h-[5rem] text-left bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-primary justify-between flex items-center focus:ring focus:ring-primary/20 transition-all duration-300 cursor-pointer"
    >
      <span class="text-sm line-clamp-1">
        {{
          selectedOption ? selectedOption.label : defaultValue ? defaultValue?.label : placeholder
        }}
      </span>
      <div class="flex items-center gap-5">
        <input
          placeholder="Search"
          class="max-w-[12rem] h-full px-2 bg-slate-50 py-2 rounded-xl focus:outline-none text-sm"
          @change.enter.prevent="handleSearch($event?.target?.value)"
          @keydown="handleOpenList"
          @click.stop
        />
        <ChevronDown
          class="w-8 h-8 transition-all duration-300"
          :class="isOpen ? 'transform rotate-180' : ''"
        />
      </div>
    </div>
    <Transition>
      <div
        v-if="isOpen"
        class="absolute z-10 mt-2 w-full bg-white border border-gray-300 min-h-[10rem] max-h-[20rem] overflow-y-auto rounded-xl shadow-lg"
      >
        <InfiniteScroll
          :loader="props.pagination?.loader"
          :has-next="props.pagination?.hasNext"
          @loadMore="handlePageItems"
        >
          <template v-if="props.options.length > 0">
            <ul class="grid gap-4 p-3">
              <ListItem
                v-for="option in props.options"
                :key="option.value"
                :options="props.options"
                :option="option"
                :searchTerm="searchTerm"
                :selectedOption="
                  selectedOption ? selectedOption : defaultValue ? defaultValue : null
                "
                @selectOption="selectOption"
              />
            </ul>
          </template>
          <template v-else>
            <div
              class="flex min-h-[10rem] max-h-[20rem] flex-col items-center justify-center gap-4"
            >
              <p class="text-slate-500 text-sm">No items found</p>
              <Loader2 class="animate-spin" :size="16" />
            </div>
          </template>
        </InfiniteScroll>
      </div>
    </Transition>
  </div>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
