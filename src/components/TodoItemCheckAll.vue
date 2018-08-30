<template>
  <div>
    <label><input type="checkbox" class="checkbox" v-bind:checked="!anyRemaining" v-on:change="allChecked" v-if="filter == 'all'"></label>
  </div>
</template>

<script>
import { EventBus } from '../main'
export default {
  name: 'TodoItemCheckAll',
  props: {
    filter: {
      type: String,
      required: true
    },
    anyRemaining: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    allChecked () {
      EventBus.$emit('check-all-todos', this.anyRemaining)
    }
  }
}
</script>
