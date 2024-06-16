<template>
  <div class="w-full pt-1 px-2 pb-4 border-t-2 border-blue-100">
    <p class="text-gray-800">{{ comment.content }}</p>
  </div>
</template>

<script setup>
defineProps({
  comment: {
    type: Object,
    required: true
  }
})
</script>
