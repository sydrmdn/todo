<template>
  <div>
    <input type="text" class="todo-input" placeholder="Things need to be done.." v-model="newTodo" v-on:keyup.enter="addTodo">

    <div class="top-section">
      <div>
        <label><input type="checkbox" class="checkbox" v-bind:checked="!anyRemaining" v-on:change="checkAllTodos" v-if="filter == 'all'"></label>
      </div>
      <div>
        <button class="button">{{ remainingCount }} active item</button>
      </div>
    </div>

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="todo-item" v-for="(todo, index) in todosFiltered" v-bind:key="todo.id">
        <div class="todo-item-left">
          <div>
            <input class="checkbox" type="checkbox" v-model="todo.completed">
          </div>
          <div class="todo-item-label" v-if="!todo.editing" v-on:dblclick="editTodo(todo)" v-bind:class="{ completed : todo.completed }">{{ todo.title }}</div>
          <input type="text" class="todo-item-edit" v-model="todo.title" v-else v-on:blur="doneEdit(todo)" v-on:keyup.enter="doneEdit(todo)" v-on:keyup.esc="cancelEdit(todo)" v-focus>
        </div>
        <div class="remove-item" v-on:click="removeTodo(index)">
          &times;
        </div>
      </div>
    </transition-group>

    <div class="bottom-section">
      <div>
        <button class="button" v-bind:class="{ active : filter == 'all' }" v-on:click="filter = 'all'">All</button>
        <button class="button" v-bind:class="{ active : filter == 'active' }" v-on:click="filter = 'active'">Active</button>
        <button class="button" v-bind:class="{ active : filter == 'completed' }" v-on:click="filter = 'completed'">Completed</button>
      </div>
      <div>
        <transition name="fade">
          <button class="button" v-if="showClearCompletedButton" v-on:click="clearCompleted">Clear Completed</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      newTodo: '',
      idForTodo: 4,
      oldTitle: '',
      filter: 'all',
      todos: [
        {
          id: 1,
          title: 'Finish Vue todo app part 1',
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: 'Subuh Prayer',
          completed: false,
          editing: false
        },
        {
          id: 3,
          title: 'Makan',
          completed: false,
          editing: false
        }
      ]
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  computed: {
    remainingCount () {
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining () {
      return this.remainingCount !== 0
    },
    todosFiltered () {
      if (this.filter === 'all') {
        return this.todos
      } else if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed)
      } else if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    },
    showClearCompletedButton () {
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim().length === 0) {
        return
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      })
      this.newTodo = ''
      this.idForTodo++
    },
    removeTodo (index) {
      this.todos.splice(index, 1)
    },
    editTodo (todo) {
      this.oldTitle = todo.title
      todo.editing = true
    },
    doneEdit (todo) {
      if (todo.title.trim().length === 0) {
        todo.title = this.oldTitle
      }
      todo.editing = false
    },
    cancelEdit (todo) {
      todo.title = this.oldTitle
      todo.editing = false
    },
    checkAllTodos () {
      this.todos.forEach((todo) => (todo.completed = event.target.checked))
    },
    clearCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');
.todo-input {
  width: 100%;
  padding: 15px 18px;
  font-size: 24px;
  margin-bottom: 16px;
  border: 2px solid #e5e5e5;
  color: #2c3e50;
  &:focus {
    outline: 0;
    border: 2px solid #36CE8F;
  }
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
  padding-bottom: 5px;
  font-size: 40px;
  color: #e5e5e5;
  &:hover {
    color: darken(#e5e5e5, 10%);
  }
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 2px solid white;
  margin-left: 12px;
  font-size: 24px;
}
.todo-item-edit {
  padding: 10px;
  border: 2px solid #e5e5e5;
  margin-left: 12px;
  font-size: 24px;
  color: #2c3e50;
  width: 100%;
  &:focus {
    outline: none;
    border: 2px solid #36CE8F;
  }
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.top-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-bottom: 2px solid #e5e5e5;
  padding-bottom: 14px;
  margin-bottom: 14px;
}
.bottom-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 2px solid #e5e5e5;
  padding-top: 14px;
  margin-bottom: 14px;
}
.checkbox {
  display: inline-block;
  height: 16px;
  width: 16px;
  overflow: hidden;
  vertical-align: middle;
  box-sizing: border-box;
  margin: 1px 3px 1px 3px;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border: 2px solid #e5e5e5;
  &:focus {
    outline: none;
    border-color: #36CE8F;
  }
  &:checked {
    background-color: #36CE8F;
    border-color: transparent;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23fff%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A");
  }
  &:checked:focus {
    background-color: #36CE8F;
  }
  &:disabled {
    background-color: #f8f8f8;
    border-color: #e5e5e5;
  }
  &:disabled:checked {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23999%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A");
  }
  &:not(:disabled) {
    cursor: pointer;
  }
}
.button{
  border: none;
  padding: 5px 10px 5px 10px;
  background: #7185ec;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.2);
  outline: 0;
  &:hover{
    background-color: #586cd8;
  }
  &:active{
    position: relative;
    top: 1px;
    left: 1px;
    box-shadow: none;
  }
}
.button.active {
  position: relative;
  top: 1px;
  left: 1px;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: #586cd8;
}
</style>
