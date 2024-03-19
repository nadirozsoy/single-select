<script setup lang="ts">
import SingleSelect from '@/components/shared/SingleSelect/SingleSelect.vue'
import { useCharacters } from '@/composables/useCharacters'
import { ref } from 'vue'

const { characters, pagination, handleLoadMore, handleSearch } = useCharacters()

const form = ref({
  character: null
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 pt-12 sm:pt-20">
    <SingleSelect
      v-model:value="form.character"
      :options="characters"
      :pagination="pagination"
      @loadMoreOptions="handleLoadMore"
      @search="handleSearch"
      placeholder="Select a character"
    />
  </div>
</template>
