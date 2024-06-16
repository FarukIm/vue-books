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
    <div class="w-full flex h-14 justify-center items-end mb-2">
      <LikeButton
        :bookId="book.id"
        :isLiked="isLiked"
        @like="emit('like', book.id)"
      />
    </div>
  </div>
</template>

<script setup>
import LikeButton from './LikeButton.vue'
defineProps({
  book: {
    type: Object,
    required: true
  },
  isLiked: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['open-modal', 'like'])
</script>
