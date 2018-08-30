<template>
  <div>
    <a class="button button-pink">{{ remainingCount }} active item</a>
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
