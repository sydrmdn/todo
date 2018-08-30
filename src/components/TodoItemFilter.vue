<template>
  <div>
    <a class="button button-pink" v-bind:class="{ active : filter == 'all' }" v-on:click="changeFilter('all')">All</a>
    <a class="button button-pink" v-bind:class="{ active : filter == 'active' }" v-on:click="changeFilter('active')">Active</a>
    <a class="button button-pink" v-bind:class="{ active : filter == 'completed' }" v-on:click="changeFilter('completed')">Completed</a>
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
