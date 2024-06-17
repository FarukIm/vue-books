<template>
  <button
    class="flex flex-row justify-center grow-0 shrink-0 items-center h-fit w-32 gap-2 p-2 rounded-xl text-white font-semibold hover:outline-blue-200 hover:outline-2 hover:outline transition-all duration-300"
    :class="isLiked ? 'bg-blue-500 text-white' : 'bg-white text-black'"
    @click="emit('like', bookId)"
  >
    {{ isLiked ? 'Liked' : 'Like' }}
    <LikeIcon />
    <span>
      {{ likeCount > 99 ? '99+' : likeCount }}
    </span>
  </button>
</template>

<script setup>
import LikeIcon from '@/assets/icons/LikeIcon.vue'

const { bookId, newLike, likeCount } = defineProps({
  bookId: {
    type: Number,
    required: true
  },
  isLiked: {
    type: Boolean,
    required: true
  },
  likeCount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['like'])
</script>
