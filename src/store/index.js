import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    balance: 0
  },
  mutations: {
    updateBalance(state, newBalance) {
      state.balance = newBalance;
    }
  },
  actions: {},
  getters: {
    getBalance(state) {
      return state.balance;
    }
  }
});
