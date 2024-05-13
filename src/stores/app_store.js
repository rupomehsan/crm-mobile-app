import { defineStore } from 'pinia';

export const app_store = defineStore('app_store', {
  state: () => ({
    counter: 0,
    selected_number: '',
    selected_name: '',
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    set_selected_number: function(number=""){
      this.selected_number = number;
    },
    set_selected_name: function(name=""){
      this.selected_name = name;
    },
  },
});
