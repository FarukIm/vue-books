<template>
  <h1>Home</h1>
  <BookModal
    :isOpen="isModalOpen"
    :book="selectedBook"
    @close-modal="isModalOpen = false"
  />
  <main class="flex flex-col w-full justify-center items-center">
    <div v-if="loading">Loading...</div>
    <div
      v-else
      class="w-full flex flex-row flex-wrap justify-center items-center gap-4 max-w-screen-xl"
    >
      <div v-for="book in data" :key="book.id">
        <ItemCard
          :book="book"
          @open-modal="(isModalOpen = true), (selectedBook = $event)"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBooks } from '../api'
import ItemCard from '@/components/ItemCard.vue'
import BookModal from '@/components/BookModal.vue'

const data = ref([])
const loading = ref(true)
const error = ref(null)
const selectedBook = ref(null)
const isModalOpen = ref(false)

const fetchData = async () => {
  try {
    const result = await getBooks()
    data.value = result
  } catch (err) {
    error.value = 'Failed to fetch data'
    console.error(err)
  } finally {
    loading.value = false
  }
}
const output = () => {
  console.log(data.value)
}
onMounted(() => {
  fetchData()
})
</script>
