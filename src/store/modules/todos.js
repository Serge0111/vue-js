import { environment } from '../../environments/environment';
import axios from 'axios';

const state = {
  todos: [],
  selectedItem: null
};

const getters = {
  allTodos: (state) => state.todos,
  editSelectedItem: (state) => state.selectedItem
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(environment.api);
    commit('setTodos',response.data)
  },
  async removeTodos({ commit }, id) {
    await axios.delete(`${environment.api}/${id}`);
    commit('deleteTodos', id)
  },
  async addTodos({ commit }, name) {
    const added = await axios.post(environment.api, { name });
    commit('addedTodos', added.data);
  },
  async updateBrand({ commit }, brand) {
    const updated = await axios.put(environment.api, { name: brand.name });
    if(updated) commit('updatedBrand', brand);
  },
  selectItem({commit}, selectedItem) {
    console.log('HERE SELECTRD ITED', selectedItem);
    commit('selectedBrand', selectedItem)
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  addedTodos: (state, todos) => { 
    state.todos = [ ...state.todos, todos ];
    return state.todos;
  },
  updatedBrand: (state, updated) => {
    state.todos = state.todos.map(brand => brand.id !== updated.id ? brand : updated );
    return state.todos;
  },
  deleteTodos: (state, id) => ( state.todos = state.todos.filter(todo => id !== todo.id ) ) ,
  selectedBrand: (state, selectedItem) => ( state.selectedItem = selectedItem ) ,
};

export default {
  state,
  getters,
  actions,
  mutations,
}