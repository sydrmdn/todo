<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <div>
        <input class="checkbox" type="checkbox" v-model="completed" v-on:change="doneEdit">
      </div>
      <div class="todo-item-label" v-if="!editing" v-on:dblclick="editTodo" v-bind:class="{ completed : completed }">{{ title }}</div>
      <input type="text" class="todo-item-edit" v-model="title" v-else v-on:blur="doneEdit" v-on:keyup.enter="doneEdit" v-on:keyup.esc="cancelEdit" v-focus>
    </div>
    <div class="todo-item-right">
      <button class="button" style="" v-on:click="pluralize">Pluralize</button>
      <span class="remove-item" v-on:click="removeTodo(todo.id)">
        &times;
      </span>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../main'
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'completed': this.todo.completed,
      'editing': this.todo.editing,
      'oldTitle': ''
    }
  },
  created () {
    EventBus.$on('pluralize', this.handlePluralize)
  },
  beforeDestroy () {
    EventBus.$off('pluralize', this.handlePluralize)
  },
  watch: {
    checkAll () {
      this.completed = this.checkAll ? true : this.todo.completed
    }
  },
  methods: {
    removeTodo (id) {
      this.$store.dispatch('removeTodo', id)
    },
    editTodo () {
      this.oldTitle = this.title
      this.editing = true
    },
    doneEdit () {
      if (this.title.trim().length === 0) {
        this.title = this.oldTitle
      }
      this.editing = false
      this.$store.commit('doneEdit', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'editing': this.editing
      })
    },
    cancelEdit () {
      this.title = this.oldTitle
      this.editing = false
    },
    pluralize () {
      EventBus.$emit('pluralize')
    },
    handlePluralize () {
      this.title = this.title + 's'
      const index = this.$store.state.todos.findIndex((item) => item.id === this.id)
      this.$store.state.todos.splice(index, 1, {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'editing': this.editing
      })
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>
