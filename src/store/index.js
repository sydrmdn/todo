import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://todo-api.gg/api/'

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    todos: []
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
    deleteTodo: (state, id) => {
      const index = state.todos.findIndex((item) => item.id === id)
      state.todos.splice(index, 1)
    },
    updateTodo: (state, todo) => {
      const index = state.todos.findIndex((item) => item.id === todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'editing': todo.editing
      })
    },
    clearCompleted: state => {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    changeFilter: (state, filter) => {
      state.filter = filter
    },
    allChecked: (state, checked) => {
      state.todos.forEach((todo) => (todo.completed = checked))
    },
    retrieveTodos: (state, todos) => {
      state.todos = todos
    }
  },
  actions: {
    retrieveTodos: context => {
      axios.get('/todos')
        .then(response => {
          context.commit('retrieveTodos', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTodo: (context, todo) => {
      axios.post('/todos', {
        title: todo.title,
        completed: false
      })
        .then(response => {
          context.commit('addTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateTodo: (context, todo) => {
      axios.patch('/todos/' + todo.id, {
        title: todo.title,
        completed: todo.completed
      })
        .then(response => {
          context.commit('updateTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteTodo: (context, id) => {
      axios.delete('/todos/' + id)
        .then(response => {
          context.commit('deleteTodo', id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    allChecked: (context, checked) => {
      axios.patch('/todos-check-all', {
        completed: checked
      })
        .then(response => {
          context.commit('allChecked', checked)
        })
        .catch(error => {
          console.log(error)
        })
    },
    clearCompleted: context => {
      const completed = store.state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id)
      axios.delete('/todos-delete-completed/', {
        data: {
          todos: completed
        }
      })
        .then(response => {
          context.commit('clearCompleted')
        })
        .catch(error => {
          console.log(error)
        })
    }
    // deleteTodo: (context, todo) => {
    //   setTimeout(() => {
    //     context.commit('deleteTodo', todo)
    //   }, 1000)
    // }
  }
})
