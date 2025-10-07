import { defineStore } from 'pinia'

import { TASKS } from '~/constants/mockData';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: TASKS,
  }),

  actions: {
    addTodo(todo: Todo) {
      console.log('todo:', todo);
      this.todos.push(todo);
    }
  },

  getters: {
    allTodos: (state) => state.todos,
  },
})