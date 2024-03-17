<script setup lang="ts"></script>

<template>
  <footer class="m-4 rounded-lg shadow dark:bg-gray-800">
    <div class="containerSmall flex items-center justify-between gap-8 p-4 max-sm:flex-col">
      <div class="flex gap-2 text-sm text-gray-500 sm:text-center dark:text-gray-400">
        <span>© {{ new Date().getFullYear() }}</span>
        <p>Nadir Özsoy . All Rights Reserved.</p>
      </div>
      <ul class="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400">
        <li>
          <router-link to="#" class="me-4 hover:underline md:me-6">Home</router-link>
        </li>
        <li>
          <a href="https://github.com/nadirozsoy" class="me-4 hover:underline md:me-6" target="_blank">My Github</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/thisisnadirozsoy/" class="me-4 hover:underline md:me-6" target="_blank">
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
