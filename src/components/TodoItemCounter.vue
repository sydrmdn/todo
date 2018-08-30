<template>
  <div>
    <button class="button">{{ remainingCount }} active item</button>
  </div>
</template>

<script>
export default {
  name: 'TodoItemCounter',
  props: {
    remainingCount: {
      type: Number,
      required: true
    }
  }
}
</script>
