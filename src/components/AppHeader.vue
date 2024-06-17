<template>
  <header
    class="flex items-center justify-center w-full h-16 bg-blue-50 fixed top-0 px-4"
  >
    <div class="flex items-center max-w-screen-xl w-full gap-8">
      <div class="flex items-center justify-center gap-x-2">
        <BookIcon />
        <h2 class="text-xl font-bold">Knjige123</h2>
      </div>
      <SearchBar @search-query="handleSearchQuery($event)" />
    </div>
  </header>
</template>

<script setup>
import SearchBar from './SearchBar.vue'
import BookIcon from '@/assets/icons/BookIcon.vue'

const emit = defineEmits(['search-query'])

function handleSearchQuery(event) {
  emit('search-query', event)
}
</script>
