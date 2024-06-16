<template>
  <form
    @submit.prevent="submitComment()"
    class="flex flex-row justify-between items-center gap-2 w-full"
  >
    <textarea
      v-model="newComment"
      placeholder="Enter your comment"
      class="w-full p-2 border-2 resize-none h-16 border-blue-200 rounded-md"
    ></textarea>
    <button
      type="submit"
      class="flex flex-row justify-center grow-0 shrink-0 items-center h-fit w-20 gap-2 p-2 rounded-xl text-white font-semibold bg-blue-500 hover:bg-green-300 hover:outline-blue-200 hover:outline-2 hover:outline transition-all duration-300"
    >
      Post
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const newComment = ref('')

const emit = defineEmits(['submit-comment'])

const submitComment = () => {
  if (newComment.value.trim()) {
    emit('submit-comment', newComment.value)
    newComment.value = ''
  }
}
</script>
