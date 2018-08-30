<template>
  <div>
    <button class="button">{{ remainingCount }} active item</button>
  </div>
</template>

<script>
export default {
  name: 'TodoItemCounter',
  computed: {
    remainingCount () {
      return this.$store.getters.remainingCount
    }
  }
}
</script>
