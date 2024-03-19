<script setup lang="ts">
import BaseFooter from './components/BaseFooter.vue'
import BaseHeader from './components/BaseHeader.vue'
</script>

<template>
  <div class="bg-slate-300 min-h-dvh">
    <BaseHeader />
    <main class="min-h-[calc(100dvh-12rem)] max-sm:min-h-[calc(100dvh-20rem)]">
      <RouterView />
    </main>
    <BaseFooter />
  </div>
</template>
