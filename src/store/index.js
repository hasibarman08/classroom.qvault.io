import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    balance: 0,
    products: [],
    isLoggedIn: false
  },
  mutations: {
    setBalance(state, newBalance) {
      state.balance = newBalance;
    },
    setProducts(state, newProducts) {
      state.products = newProducts;
    },
    setIsLoggedIn(state, newIsLoggedIn) {
      state.isLoggedIn = newIsLoggedIn;
    }
  },
  actions: {},
  getters: {
    getBalance(state) {
      return state.balance;
    },
    getProducts(state) {
      return state.products;
    },
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    }
  }
});
