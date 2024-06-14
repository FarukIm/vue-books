<template>
  <div class="flex flex-col min-w-40 max-w-80 grow pt-2 px-2 bg-slate-100">
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
    <button
      class="inline-block px-4 py-2 rounded-full text-white font-semibold"
    >
      LikeIcon
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['open-modal'])

defineProps({
  book: {
    type: Object,
    required: true
  }
})
</script>
