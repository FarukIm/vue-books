<template>
  <AppHeader @search-query="searchQuery = $event" />
  <BookModal
    :isOpen="isModalOpen"
    :book="selectedBook"
    :isLiked="likedBooks.includes(selectedBook.id)"
    @close-modal="isModalOpen = false"
    @like="handleLike($event)"
  />
  <main class="flex flex-col w-full justify-center items-center mt-20">
    <div v-if="loading">Loading...</div>
    <div v-else-if="totalPages === 0">No results :(</div>
    <div
      v-else
      class="w-full flex flex-row flex-wrap justify-center items-center gap-4 max-w-screen-xl mt-2"
    >
      <div v-for="book in displayData" :key="book.id">
        <ItemCard
          :book="book"
          :isLiked="likedBooks.includes(book.id)"
          @open-modal="(isModalOpen = true), (selectedBook = $event)"
          @like="handleLike($event)"
        />
      </div>
    </div>
    <div
      v-show="totalPages > 0"
      class="w-full flex justify-center items-center"
    >
      <PaginationButtons
        :totalPages="totalPages"
        :currentPage="currentPage"
        @update-page="currentPage = $event"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getBooks, updateLike, searchBooks } from '../api'

import ItemCard from '@/components/ItemCard.vue'
import BookModal from '@/components/BookModal.vue'
import PaginationButtons from '@/components/PaginationButtons.vue'
import AppHeader from '@/components/AppHeader.vue'

const displayData = ref([])
const loading = ref(true)
const selectedBook = ref({})
const isModalOpen = ref(false)
const searchQuery = ref('')
const likedBooks = ref([])
const currentPage = ref(1)
const totalPages = ref(1)

const handleLike = async (bookId) => {
  const bookIndex = displayData.value.findIndex((book) => book.id === bookId)
  if (likedBooks.value.includes(bookId)) {
    displayData.value[bookIndex].like_count -= 1
    likedBooks.value = likedBooks.value.filter((id) => id !== bookId)
    await updateLike(bookId, false)
  } else {
    likedBooks.value.push(bookId)
    displayData.value[bookIndex].like_count += 1

    await updateLike(bookId, true)
  }
  $cookies.set('likedBooks', JSON.stringify(likedBooks.value))
}

const fetchData = async () => {
  try {
    loading.value = true
    const result = await getBooks(currentPage.value)
    displayData.value = result.books
    totalPages.value = result.pageCount
  } catch (err) {
    totalPages.value = 0
    console.error(err)
  } finally {
    loading.value = false
  }
}

const fetchSearch = async () => {
  try {
    loading.value = true
    const result = await searchBooks(currentPage.value, searchQuery.value)
    displayData.value = result.books
    totalPages.value = result.pageCount
  } catch (err) {
    totalPages.value = 0
    console.error(err)
  } finally {
    loading.value = false
  }
}

watch(searchQuery, () => {
  currentPage.value = 1
  if (searchQuery.value === '') {
    fetchData()
  } else {
    fetchSearch()
  }
})

watch(currentPage, () => {
  if (searchQuery.value === '') {
    fetchData()
  } else {
    fetchSearch()
  }
})

onMounted(() => {
  fetchData()
  if ($cookies.isKey('likedBooks')) {
    likedBooks.value = $cookies.get('likedBooks')
  }
})
</script>
