<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-10 z-50"
    @click="emit('close-modal')"
  >
    <div
      class="relative flex flex-col gap-y-4 bg-white max-h-3/4 max-w-screen-md min-h-96 rounded-xl p-4 md:p-8 w-full my-6 mx-2 md:w-2/3"
      @click="$event.stopPropagation()"
    >
      <button
        @click="emit('close-modal')"
        class="absolute top-3 right-3 text-gray-500 text-3xl px-2 py-0 bg-transparent hover:text-gray-700 focus:outline-none rounded-lg"
      >
        &times;
      </button>
      <h2 class="text-3xl text-blue-500 font-semibold w-11/12">
        {{ book.title }}
      </h2>
      <p>{{ book.description }}</p>

      <div class="w-full flex justify-between items-center">
        <h3 class="text-2xl text-blue-500">Comments</h3>
        <LikeButton
          :bookId="book.id"
          :isLiked="isLiked"
          :likeCount="book.like_count"
          @like="emit('like', book.id)"
        />
      </div>
      <div class="overflow-y-auto h-56">
        <div
          v-if="loading === true"
          class="w-full flex justify-center items-center"
        >
          Loading...
        </div>
        <div
          v-else-if="comments.length === 0"
          class="w-full flex justify-center items-center"
        >
          No comments yet :(
        </div>
        <div v-else v-for="comment in comments" :key="comment.id">
          <Comment :comment="comment" />
        </div>
      </div>
      <div class="border-t-2 pt-2">
        <CommentInput @submit-comment="handleCommentSubmit($event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef, watch } from 'vue'
import { getComments, addComment } from '@/api'

import Comment from './Comment.vue'
import CommentInput from './CommentInput.vue'
import LikeButton from './LikeButton.vue'

const props = defineProps({
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

const loading = ref(true)
const comments = ref([])
const isOpen = toRef(props, 'isOpen')

const loadComments = async () => {
  loading.value = true
  if (props.book.id === undefined) return
  try {
    const response = await getComments(props.book.id)
    comments.value = response
  } catch {
    comments.value = []
  } finally {
    loading.value = false
  }
}

const handleCommentSubmit = async (comment) => {
  console.log(comment)
  loading.value = true
  const response = await addComment(props.book.id, comment)
  comments.value.unshift(response)
  loading.value = false
}

watch(isOpen, () => {
  loadComments()
})
</script>
