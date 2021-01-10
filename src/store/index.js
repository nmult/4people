import Vue from 'vue';
import Vuex from 'vuex';
import goods from './modules/goods';
import cart from './modules/cart';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    goods,
    cart,
  },
  strict: process.env.NODE_ENV !== 'production',
});

export default store;