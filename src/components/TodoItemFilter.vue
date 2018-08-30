<template>
  <div>
    <button class="button" v-bind:class="{ active : filter == 'all' }" v-on:click="changeFilter('all')">All</button>
    <button class="button" v-bind:class="{ active : filter == 'active' }" v-on:click="changeFilter('active')">Active</button>
    <button class="button" v-bind:class="{ active : filter == 'completed' }" v-on:click="changeFilter('completed')">Completed</button>
  </div>
</template>

<script>
export default {
  name: 'TodoItemFilter',
  computed: {
    filter () {
      return this.$store.state.filter
    }
  },
  methods: {
    changeFilter (filter) {
      this.$store.commit('changeFilter', filter)
    }
  }
}
</script>
