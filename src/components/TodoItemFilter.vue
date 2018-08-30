<template>
  <div>
    <button class="button" v-bind:class="{ active : filter == 'all' }" v-on:click="changeFilter('all')">All</button>
    <button class="button" v-bind:class="{ active : filter == 'active' }" v-on:click="changeFilter('active')">Active</button>
    <button class="button" v-bind:class="{ active : filter == 'completed' }" v-on:click="changeFilter('completed')">Completed</button>
  </div>
</template>

<script>
import { EventBus } from '../main'
export default {
  name: 'TodoItemFilter',
  data () {
    return {
      'filter': 'all'
    }
  },
  methods: {
    changeFilter (filter) {
      this.filter = filter
      EventBus.$emit('change-filter', filter)
    }
  }
}
</script>
