<template>
  <button
    class="flex flex-row justify-center grow-0 shrink-0 items-center h-fit w-20 gap-2 p-2 rounded-xl text-white font-semibold hover:outline-blue-200 hover:outline-2 hover:outline transition-all duration-300"
    :class="isLiked ? 'bg-green-300' : 'bg-blue-500'"
    @click="emit('like', bookId)"
  >
    <span>{{ isLiked ? 'Liked' : 'Like' }}</span> <LikeIcon />
  </button>
</template>

<script setup>
import LikeIcon from '@/assets/icons/LikeIcon.vue'

const { bookId, newLike } = defineProps({
  bookId: {
    type: Number,
    required: true
  },
  isLiked: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['like'])
</script>
