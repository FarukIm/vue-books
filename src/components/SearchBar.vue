<template>
  <input
    type="text"
    v-model="searchQuery"
    @input="onInput"
    placeholder="Search..."
    class="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
  />
</template>

<script setup>
import { ref } from 'vue'
import { debounce } from 'lodash'

const emit = defineEmits(['search-query'])

const searchQuery = ref('')

const emitSearchQuery = debounce((query) => {
  emit('search-query', query)
}, 1000)

const onInput = () => {
  emitSearchQuery(searchQuery.value)
}
</script>
