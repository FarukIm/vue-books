<template>
  <div>
    <img src="" alt="" />
    <h3>{{ book.title }}</h3>
    <h4>{{ book.author }}</h4>
    <h4>{{ book.publication_year }}</h4>
    <button>LikeIcon{{ book.likes }}</button>
  </div>
</template>

<script setup>
defineProps({
  book: {
    type: Object,
    required: true
  }
})
</script>
