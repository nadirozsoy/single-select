<script setup lang="ts">
import { highlightSearchTerm } from '@/helpers/highlightSearchTerm'
import { cn } from '@/lib/utils'
import type { Option } from '@/types'
import { Check } from 'lucide-vue-next'

type Props = {
  option: Option<string, string>
  selectedOption: Option<string, string> | null
  searchTerm: string
}

const emit = defineEmits(['selectOption'])

function selectOption(option: Option<string, string>) {
  emit('selectOption', option)
}

defineProps<Props>()
</script>

<template>
  <li
    @click="selectOption(option)"
    :class="[
      cn(
        'flex cursor-pointer items-center justify-between rounded-xl p-4 transition-all duration-200 hover:bg-slate-200',
        {
          'selected bg-primary/10 font-medium text-primary hover:bg-primary/10':
            String(option?.value) === String(selectedOption?.value)
        }
      )
    ]"
  >
    <span v-html="highlightSearchTerm(option?.label, searchTerm)"></span>
    <Check v-if="String(option?.value) === String(selectedOption?.value)" :size="18" />
  </li>
</template>
