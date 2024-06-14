<template>
  <BookModal
    :isOpen="isModalOpen"
    :book="selectedBook"
    @close-modal="isModalOpen = false"
  />
  <main class="flex flex-col w-full justify-center items-center mt-4">
    <div>
      <SearchBar @search-query="searchQuery = $event" />
    </div>
    <div v-if="loading">Loading...</div>
    <div
      v-else
      class="w-full flex flex-row flex-wrap justify-center items-center gap-4 max-w-screen-xl mt-2"
    >
      <div v-for="book in displayData" :key="book.id">
        <ItemCard
          :book="book"
          @open-modal="(isModalOpen = true), (selectedBook = $event)"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getBooks } from '../api'
import ItemCard from '@/components/ItemCard.vue'
import BookModal from '@/components/BookModal.vue'
import SearchBar from '@/components/SearchBar.vue'

const data = ref([])
const displayData = ref([])
const loading = ref(true)
const error = ref(null)
const selectedBook = ref(null)
const isModalOpen = ref(false)
const searchQuery = ref('')

const fetchData = async () => {
  try {
    const result = await getBooks()
    data.value = result
    displayData.value = result
  } catch (err) {
    error.value = 'Failed to fetch data'
    console.error(err)
  } finally {
    loading.value = false
  }
}

watch(searchQuery, () => {
  if (searchQuery.value === '') {
    displayData.value = data.value
  } else {
    loading.value = true
    displayData.value = data.value.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    loading.value = false
  }
})

onMounted(() => {
  fetchData()
})
</script>
