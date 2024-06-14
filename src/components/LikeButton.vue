<template>
  <button
    class="flex flex-row justify-center items-center gap-2 p-2 rounded-xl text-white font-semibold w-fit hover:outline-blue-200 hover:outline-2 hover:outline transition-all duration-300"
    :class="isLiked ? 'bg-green-300' : 'bg-blue-500'"
    @click="emit('like', !isLiked)"
  >
    {{ isLiked ? 'Liked' : 'Like' }} <LikeIcon />
  </button>
</template>

<script setup>
import LikeIcon from '@/assets/icons/LikeIcon.vue'

defineProps({
  isLiked: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['like'])
</script>
