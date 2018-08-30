
<template>
  <div>
    <transition name="fade">
      <button class="button" v-if="showClearCompletedButton" v-on:click="clearCompleted">Clear Completed</button>
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
      this.$store.commit('clearCompleted')
    }
  }
}
</script>
