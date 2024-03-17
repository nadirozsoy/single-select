<script setup lang="ts">
import { CopyCheck } from 'lucide-vue-next'
</script>

<template>
  <header>
    <nav class="border-gray-200 bg-white px-4 py-5 lg:px-6 dark:bg-gray-800">
      <div class="containerSmall flex items-center justify-between max-sm:flex-col">
        <div class="flex items-center gap-4">
          <CopyCheck color="white" :size="25" />
          <span class="self-center whitespace-nowrap text-sm font-semibold dark:text-white">Multi Select</span>
        </div>

        <ul class="flex items-center gap-8 text-sm font-medium">
          <li>
            <router-link
              to="/"
              class="block rounded py-2 pl-3 pr-4 font-semibold text-white lg:bg-transparent lg:p-0 dark:text-white"
              aria-current="page"
            >
              Home
            </router-link>
          </li>
          <li>
            <a
              href="https://github.com/nadirozsoy"
              class="block rounded py-2 pl-3 pr-4 font-normal text-slate-300 lg:bg-transparent lg:p-0"
              target="_blank"
            >
              My Github
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/thisisnadirozsoy/"
              class="block rounded py-2 pl-3 pr-4 font-normal text-slate-300 lg:bg-transparent lg:p-0"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
