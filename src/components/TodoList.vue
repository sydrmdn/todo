<template>
  <div>
    <input type="text" class="todo-input" placeholder="Things need to be done.." v-model="newTodo" v-on:keyup.enter="addTodo">

    <div class="top-section">
      <TodoItemCheckAll></TodoItemCheckAll>
      <TodoItemCounter></TodoItemCounter>
    </div>

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <TodoItem v-for="todo in todosFiltered" v-bind:key="todo.id" v-bind:todo="todo" v-bind:checkAll="!anyRemaining"></TodoItem>
    </transition-group>

    <div class="bottom-section">
      <TodoItemFilter></TodoItemFilter>
      <TodoItemClear></TodoItemClear>
    </div>
    <a class="btn btn-pink" href=""></a>
  </div>
</template>

<script>
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
      oldTitle: ''
    }
  },
  created () {
    this.$store.dispatch('retrieveTodos')
  },
  computed: {
    anyRemaining () {
      return this.$store.getters.anyRemaining
    },
    todosFiltered () {
      return this.$store.getters.todosFiltered
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim().length === 0) {
        return
      }
      this.$store.dispatch('addTodo', {
        id: this.idForTodo,
        title: this.newTodo
      })
      this.newTodo = ''
      this.idForTodo++
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
// .button{
//   border: none;
//   padding: 5px 10px 5px 10px;
//   background: #7185ec;
//   color: #fff;
//   border-radius: 4px;
//   cursor: pointer;
//   text-align: center;
//   font-weight: bold;
//   box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.2);
//   outline: 0;
//   &:hover{
//     background-color: #586cd8;
//   }
//   &:active{
//     position: relative;
//     top: 1px;
//     left: 1px;
//     box-shadow: none;
//   }
// }
// .button.active {
//   position: relative;
//   top: 1px;
//   left: 1px;
//   -webkit-box-shadow: none;
//   box-shadow: none;
//   background-color: #586cd8;
// }
.button {
  display: inline-block;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  padding: .30em .70em;
  transition: none;
  margin: .25em 0;
  position: relative;
  &:not(:first-child) {
    margin-left: .50em;
  }
}
.button-pink {
    background-color: #ff5a79;
    color: #fff;
    box-shadow: 0 4px #f3002e;
    &:hover {
      top: 2px;
      box-shadow: 0 2px #f3002e;
    }
    &:active {
      box-shadow: 0 0 #ff5a79;
      top: 4px;
    }
}
.button-pink.active {
    top: 2px;
    box-shadow: 0 2px #f3002e
}
</style>
