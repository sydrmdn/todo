<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <div>
        <input class="checkbox" type="checkbox" v-model="completed" v-on:change="updateTodo">
      </div>
      <div class="todo-item-label" v-if="!editing" v-on:dblclick="editTodo" v-bind:class="{ completed : completed }">{{ title }}</div>
      <input type="text" class="todo-item-edit" v-model="title" v-else v-on:blur="updateTodo" v-on:keyup.enter="updateTodo" v-on:keyup.esc="cancelEdit" v-focus>
    </div>
    <div class="todo-item-right">
      <a class="button button-pink" style="" v-on:click="pluralize">Pluralize</a>
      <span class="remove-item" v-on:click="deleteTodo(todo.id)">
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
    deleteTodo (id) {
      this.$store.dispatch('deleteTodo', id)
    },
    editTodo () {
      this.oldTitle = this.title
      this.editing = true
    },
    updateTodo () {
      if (this.title.trim().length === 0) {
        this.title = this.oldTitle
      }
      this.editing = false
      this.$store.dispatch('updateTodo', {
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
      this.$store.dispatch('updateTodo', {
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
