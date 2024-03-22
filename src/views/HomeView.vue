<script setup lang="ts">
import SingleSelect from '@/components/shared/SingleSelect/SingleSelect.vue'
import { useCharacters } from '@/composables/useCharacters'
import { ref } from 'vue'

const { characters, pagination, handleLoadMore, handleSearch } = useCharacters()

const form = ref({
  character: null
})

//You can add a more complicated cleaning function with @clear emit

// For the update form, we can get the default value that comes when the page is loaded into select with the provide inject structure.

// provide(defaultValueKey, defaultOption)
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 pt-12 sm:pt-20">
    <SingleSelect
      v-model:value="form.character"
      :options="characters"
      :pagination="pagination"
      :clearable="true"
      placeholder="Select a character"
      @loadMoreOptions="handleLoadMore"
      @search="handleSearch"
    />
  </div>
</template>
