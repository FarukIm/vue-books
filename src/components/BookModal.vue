<template>
  <div class="modal-container">
    <div class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h1>{{ book.title }}</h1>
          <div><button class="modal-close">X</button></div>
        </div>
        <div class="modal-body">
          <p>{{ book.description }}</p>
          <button class="likes">{{ book.likes }}</button>
        </div>
      </div>
    </div>
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
