<template>
  <main>
    <h1>Home</h1>
    <form @submit.prevent="output">
      <button type="submit">Get Books</button>
    </form>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBooks } from '../api'

const data = ref(null)
const loading = ref(true)
const error = ref(null)

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
