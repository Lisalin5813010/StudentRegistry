/*import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_success(state, token) {
      state.token = token;
    },
    logout(state) {
      state.token = '';
    },
    set_user(state, user) {
      state.user = user;
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: 'http://localhost:8081/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.headers['authorization'];
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', token);
            resolve(resp);
          })
          .catch(err => {
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
});
*/