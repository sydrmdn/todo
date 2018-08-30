<template>
  <div>
    <label><input type="checkbox" class="checkbox" v-bind:checked="!anyRemaining" v-on:change="allChecked" v-if="filter == 'all'"></label>
  </div>
</template>

<script>
export default {
  name: 'TodoItemCheckAll',
  computed: {
    anyRemaining () {
      return this.$store.getters.anyRemaining
    },
    filter () {
      return this.$store.state.filter
    }
  },
  methods: {
    allChecked () {
      this.$store.commit('allChecked', event.target.checked)
    }
  }
}
</script>
