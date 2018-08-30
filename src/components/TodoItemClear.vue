<template>
  <div>
    <transition name="fade">
      <a class="button button-pink" v-if="showClearCompletedButton" v-on:click="clearCompleted">Clear Completed</a>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TodoItemClear',
  computed: {
    showClearCompletedButton () {
      return this.$store.getters.showClearCompletedButton
    }
  },
  methods: {
    clearCompleted () {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>
