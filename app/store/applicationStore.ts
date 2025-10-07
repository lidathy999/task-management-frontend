import { defineStore } from 'pinia'

export const useApplicationStore = defineStore('application', {
  state: () => ({
   activeSidebar: 'dashboard',
  }),

  actions: {
    setActiveSidebar(name: string) {
      this.activeSidebar = name;
    }
  },
  
  getters: {
    activeSidebar: (state) => state.activeSidebar,
  },
})