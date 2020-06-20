import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    balance: 0,
    products: [],
    isLoggedIn: false,
    courses: [],
    user: null,
    currentModuleUUID: null
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
    },
    setCourses(state, newCourses) {
      state.courses = newCourses;
    },
    setUser(state, newUser) {
      state.user = newUser;
    },
    setCurrentModuleUUID(state, newCurrentModuleUUID) {
      state.currentModuleUUID = newCurrentModuleUUID;
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
    },
    getCourses(state) {
      return state.courses;
    },
    getUser(state) {
      return state.user;
    },
    getCurrentModuleUUID(state) {
      return state.currentModuleUUID;
    }
  }
});
