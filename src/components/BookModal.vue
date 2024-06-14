<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-10"
    @click="emit('close-modal')"
  >
    <div
      class="bg-white h-1/6 min-h-56 rounded-xl p-4 w-full my-6 mx-2 lg:w-1/2 2xl:w-1/3 relative"
      @click="$event.stopPropagation()"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-3xl mb-1 text-blue-500 font-semibold">
          {{ book.title }}
        </h2>
        <button
          @click="emit('close-modal')"
          class="text-gray-500 text-lg px-2 py-0 bg-transparent hover:text-gray-700 focus:outline-none rounded-lg"
        >
          X
        </button>
      </div>
      <p>{{ book.description }}</p>
      <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <LikeButton
          :bookId="book.id"
          :isLiked="isLiked"
          @like="emit('like', book.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import LikeButton from './LikeButton.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  book: {
    type: Object,
    required: true
  },
  isLiked: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close-modal', 'like'])
</script>
