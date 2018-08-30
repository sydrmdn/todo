import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      {
        id: 1,
        title: 'Learn Vue.js',
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: 'Learn Laravel',
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
  },
  getters: {
    remainingCount: state => {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining: (state, getters) => {
      return getters.remainingCount !== 0
    },
    todosFiltered: state => {
      if (state.filter === 'all') {
        return state.todos
      } else if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton: state => {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    addTodo: (state, todo) => {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      })
    },
    removeTodo: (state, id) => {
      const index = state.todos.findIndex((item) => item.id === id)
      state.todos.splice(index, 1)
    },
    doneEdit: (state, todo) => {
      const index = state.todos.findIndex((item) => item.id === todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'editing': todo.editing
      })
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    changeFilter: (state, filter) => {
      state.filter = filter
    },
    allChecked: (state, checked) => {
      state.todos.forEach((todo) => (todo.completed = checked))
    }
  },
  actions: {
    removeTodo: (context, todo) => {
      setTimeout(() => {
        context.commit('removeTodo', todo)
      }, 1000)
    }
  }
})
