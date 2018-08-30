<template>
  <div>
    <input type="text" class="todo-input" placeholder="Things need to be done.." v-model="newTodo" v-on:keyup.enter="addTodo">

    <div class="top-section">
      <TodoItemCheckAll :anyRemaining="anyRemaining" :filter="filter"></TodoItemCheckAll>
      <TodoItemCounter :remainingCount="remainingCount"></TodoItemCounter>
    </div>

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <TodoItem v-for="todo in todosFiltered" v-bind:key="todo.id" v-bind:todo="todo" v-bind:checkAll="!anyRemaining">
        <!-- <div class="todo-item" v-for="(todo, index) in todosFiltered" v-bind:key="todo.id">
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
        </div> -->
      </TodoItem>
    </transition-group>

    <div class="bottom-section">
      <TodoItemFilter></TodoItemFilter>
      <TodoItemClear :showClearCompletedButton="showClearCompletedButton"></TodoItemClear>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../main'
import TodoItem from './TodoItem'
import TodoItemCounter from './TodoItemCounter'
import TodoItemCheckAll from './TodoItemCheckAll'
import TodoItemFilter from './TodoItemFilter'
import TodoItemClear from './TodoItemClear'
export default {
  name: 'TodoList',
  components: {
    TodoItem,
    TodoItemCounter,
    TodoItemCheckAll,
    TodoItemFilter,
    TodoItemClear
  },
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
  created () {
    EventBus.$on('remove-todo', (id) => this.removeTodo(id))
    EventBus.$on('done-edit', (data) => this.doneEdit(data))
    EventBus.$on('check-all-todos', (checked) => this.checkAllTodos(checked))
    EventBus.$on('change-filter', (filter) => (this.filter = filter)) // this update the filter in the parent
    EventBus.$on('clear-completed', () => this.clearCompleted())
  },
  beforeDestroy () {
    EventBus.$off('remove-todo', (index) => this.removeTodo(index))
    EventBus.$off('done-edit', (data) => this.doneEdit(data))
    EventBus.$off('check-all-todos', (checked) => this.checkAllTodos(checked))
    EventBus.$off('change-filter', (filter) => (this.filter = filter))
    EventBus.$off('clear-completed', () => this.clearCompleted())
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
    removeTodo (id) {
      const index = this.todos.findIndex((item) => item.id === id)
      this.todos.splice(index, 1)
    },
    // editTodo (todo) {
    //   this.oldTitle = todo.title
    //   todo.editing = true
    // },
    // doneEdit (todo) {
    //   if (todo.title.trim().length === 0) {
    //     todo.title = this.oldTitle
    //   }
    //   todo.editing = false
    // },
    // cancelEdit (todo) {
    //   todo.title = this.oldTitle
    //   todo.editing = false
    // },
    checkAllTodos () {
      this.todos.forEach((todo) => (todo.completed = event.target.checked))
    },
    clearCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    doneEdit (data) {
      const index = this.todos.findIndex((item) => item.id === data.id)
      this.todos.splice(index, 1, data)
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
.todo-item-right {
  display: flex;
  align-items: center;
  justify-content: center;
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
