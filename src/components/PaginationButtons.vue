<template>
  <div class="flex flex-row justify-center items-center gap-x-2 my-4">
    <button
      class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50 transition-all duration-300"
      :disabled="currentPage === 1"
      @click="goToPage(Number(currentPage) - 1)"
    >
      Previous
    </button>

    <div>Page {{ currentPage }} of {{ totalPages }}</div>

    <button
      class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50 transition-all duration-300"
      :disabled="currentPage === totalPages"
      @click="goToPage(Number(currentPage) + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const currentPage = computed(() => props.currentPage)
const totalPages = computed(() => props.totalPages)

const emit = defineEmits(['update-page'])

const goToPage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    emit('update-page', newPage)
  }
}
</script>
