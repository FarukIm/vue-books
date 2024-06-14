<template>
  <button
    class="flex flex-row justify-center items-center gap-2 p-2 rounded-xl text-white font-semibold w-fit hover:outline-blue-200 hover:outline-2 hover:outline transition-all duration-300"
    :class="isLiked ? 'bg-green-300' : 'bg-blue-500'"
    @click="handleLike()"
  >
    {{ isLiked ? 'Liked' : 'Like' }} <LikeIcon />
  </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import LikeIcon from '@/assets/icons/LikeIcon.vue'

const { bookId } = defineProps({
  bookId: {
    type: Number,
    required: true
  }
})

const isLiked = ref(
  $cookies.isKey('likedBooks') && $cookies.get('likedBooks').includes(bookId)
)

const handleLike = () => {
  isLiked.value = !isLiked.value
  const likedBooks = $cookies.get('likedBooks')
  if (likedBooks && likedBooks.includes(bookId)) {
    $cookies.set(
      'likedBooks',
      JSON.stringify(likedBooks.filter((id) => id !== bookId))
    )
  } else if (likedBooks === null) {
    $cookies.set('likedBooks', JSON.stringify([bookId]))
  } else {
    $cookies.set(
      'likedBooks',
      JSON.stringify([...$cookies.get('likedBooks'), bookId])
    )
  }
}

watchEffect(isLiked)
</script>
