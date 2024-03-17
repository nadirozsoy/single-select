<script setup lang="ts">
import { highlightSearchTerm } from '@/helpers/highlightSearchTerm'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-vue-next'

type Props = {
  option: { label: string; value: number }
  selectedOption: { label: string; value: number } | null
  searchTerm: string
}

const emit = defineEmits(['selectOption'])

function selectOption(option: { label: string; value: number }) {
  emit('selectOption', option)
}

defineProps<Props>()
</script>

<template>
  <li
    @click="selectOption(option)"
    :class="[
      cn(
        'p-4 flex justify-between cursor-pointer rounded-xl hover:bg-slate-200 transition-all duration-200 items-center',
        {
          'text-primary font-medium bg-primary/10 hover:bg-primary/10':
            String(option?.value) === String(selectedOption?.value)
        }
      )
    ]"
  >
    <span v-html="highlightSearchTerm(option?.label, searchTerm)"> </span>
    <Check v-if="String(option?.value) === String(selectedOption?.value)" :size="18" />
  </li>
</template>
