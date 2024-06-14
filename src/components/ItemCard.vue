<template>
  <div class="flex flex-col w-80 grow pt-2 px-2 bg-slate-100">
    <img :src="book.cover_image" alt="book cover" class="object-cover" />
    <div class="h-20 flex flex-col justify-start items-start mt-0.5">
      <h4
        class="font-bold text-xl hover:underline hover:cursor-pointer"
        @click="$emit('open-modal', book)"
      >
        {{ book.title }}
      </h4>
      <p class="text-gray-700 text-base">{{ book.author }}</p>
      <p class="text-gray-700 text-base">{{ book.publication_year }}</p>
    </div>
    <div class="w-full flex justify-center mb-2">
      <LikeButton :isLiked="isLiked" @like="handleLike" />
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'

import LikeButton from './LikeButton.vue'

const { book } = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const $cookies = inject('$cookies')

const emit = defineEmits(['open-modal'])

const isLiked = ref(
  $cookies.get('likedBooks')?.includes(book.id) ? true : false
)

const handleLike = () => {
  isLiked.value = !isLiked.value
  const likedBooks = $cookies.get('likedBooks')
  if (likedBooks && likedBooks.includes(book.id)) {
    $cookies.set(
      'likedBooks',
      JSON.stringify(likedBooks.filter((id) => id !== book.id))
    )
  } else if (likedBooks === null) {
    $cookies.set('likedBooks', JSON.stringify([book.id]))
  } else {
    $cookies.set(
      'likedBooks',
      JSON.stringify([...$cookies.get('likedBooks'), book.id])
    )
  }
}
</script>
