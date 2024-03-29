<script setup lang="ts">
import { useClickOutside } from '@/composables/useClickOutside'
import { ChevronDown, Loader2, X } from 'lucide-vue-next'
import { ref, type Ref, nextTick, inject } from 'vue'
import InfiniteScroll from '../InfiniteScroll.vue'
import ListItem from './ListItem.vue'
import type { ISingleSelect, Option } from '@/types'
import { defaultValueKey } from '@/lib/keys'

const props = withDefaults(defineProps<ISingleSelect>(), {
  clearable: false,
  placeholder: 'Select an option'
})
const emit = defineEmits(['update:value', 'loadMoreOptions', 'search', 'clear'])

const isOpen = ref(false)
const selectedOption: Ref<Option<string, string> | null> = ref(null)
const singleSelect: Ref<HTMLDivElement | null> = ref(null)
const searchTerm: Ref<string> = ref('')
const defaultValue = inject<Ref<Option<string, string> | null>>(defaultValueKey)

const selectOption = (option: Option<string, string>) => {
  selectedOption.value = option
  emit('update:value', option.value)
  isOpen.value = false
}

const handleToggleSelect = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && selectedOption.value) {
    nextTick(() => {
      const selectedElement = document.querySelector('.selected')
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
  }
}

const handlePageItems = () => {
  emit('loadMoreOptions')
}

const handleSearch = (search: string) => {
  emit('search', search)
  searchTerm.value = search
  isOpen.value = true
}

const handleClearSelect = (e: Event): void => {
  e.stopPropagation()
  selectedOption.value = null
  if (defaultValue?.value) defaultValue.value = null
  emit('update:value', null)
  emit('clear')
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
      class="group flex h-[5rem] w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-gray-300 bg-white pl-7 pr-4 text-left shadow-sm transition-all duration-300 focus:border-primary focus:outline-none focus:ring focus:ring-primary/20"
      data-test="select-toggle"
    >
      <div class="flex w-full items-center justify-between">
        <span class="line-clamp-1 text-sm" data-test="selected-option">
          {{ selectedOption ? selectedOption.label : defaultValue ? defaultValue?.label : placeholder }}
        </span>
        <div
          v-if="clearable && (selectedOption || defaultValue)"
          class="invisible scale-0 opacity-0 transition-all duration-150 group-hover:visible group-hover:scale-100 group-hover:opacity-100"
          @click="handleClearSelect"
          data-test="clear-button"
        >
          <X :size="20" class="rounded-full bg-slate-200 p-1" />
        </div>
      </div>
      <div class="flex items-center gap-5">
        <input
          placeholder="Search"
          class="h-full max-w-[12rem] rounded-xl bg-slate-50 px-2 py-2 text-sm focus:outline-none"
          @change.enter.prevent="handleSearch(($event.target as HTMLInputElement)?.value)"
          @keydown="handleOpenList"
          @click.stop
        />
        <ChevronDown class="h-8 w-8 transition-all duration-300" :class="isOpen ? 'rotate-180 transform' : ''" />
      </div>
    </div>
    <Transition>
      <div
        v-if="isOpen"
        class="absolute z-10 mt-2 max-h-[20rem] min-h-[10rem] w-full overflow-y-auto rounded-xl border border-gray-300 bg-white shadow-lg"
        data-test="option-list"
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
                :option="option"
                :searchTerm="searchTerm"
                :selectedOption="selectedOption ? selectedOption : defaultValue ? defaultValue : null"
                @selectOption="selectOption"
              />
            </ul>
          </template>
          <template v-else>
            <div class="flex max-h-[20rem] min-h-[10rem] flex-col items-center justify-center gap-4">
              <p class="text-sm text-slate-500">No items found</p>
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
