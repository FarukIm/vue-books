<template>
  <BookModal
    :isOpen="isModalOpen"
    :book="selectedBook"
    :isLiked="likedBooks.includes(selectedBook.id)"
    @close-modal="isModalOpen = false"
    @like="handleLike($event)"
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
          :isLiked="likedBooks.includes(book.id)"
          @open-modal="(isModalOpen = true), (selectedBook = $event)"
          @like="handleLike($event)"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getBooks, updateLike } from '../api'
import ItemCard from '@/components/ItemCard.vue'
import BookModal from '@/components/BookModal.vue'
import SearchBar from '@/components/SearchBar.vue'

const data = ref([])
const displayData = ref([])
const loading = ref(true)
const error = ref(null)
const selectedBook = ref({})
const isModalOpen = ref(false)
const searchQuery = ref('')
const likedBooks = ref([])

const handleLike = async (bookId) => {
  let res
  if (likedBooks.value.includes(bookId)) {
    likedBooks.value = likedBooks.value.filter((id) => id !== bookId)
    res = await updateLike(bookId, false)
  } else {
    likedBooks.value.push(bookId)
    res = await updateLike(bookId, true)
  }
  console.log(res)
  $cookies.set('likedBooks', JSON.stringify(likedBooks.value))
}

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
  if ($cookies.isKey('likedBooks')) {
    likedBooks.value = $cookies.get('likedBooks')
  }
})
</script>
