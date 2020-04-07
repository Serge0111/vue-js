import Vuex from 'vuex';
import Vue from 'vue';
import brand from './modules/brand'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    brand
  }
})