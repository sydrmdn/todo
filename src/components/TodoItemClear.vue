<template>
  <div>
    <transition name="fade">
      <button class="button" v-if="showClearCompletedButton" v-on:click="clearCompleted">Clear Completed</button>
    </transition>
  </div>
</template>

<script>
import { EventBus } from '../main'
export default {
  name: 'TodoItemClear',
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompleted () {
      EventBus.$emit('clear-completed')
    }
  }
}
</script>
