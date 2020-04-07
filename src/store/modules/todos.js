import { environment } from '../../environments/environment';
import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(environment.api);
    commit('setTodos',response.data)
  },
  async removeTodos({ commit }, ids) {
    await axios.delete(environment.api, { params: { id: ids } });
    commit('deleteTodos', ids)
  },
  async addTodos({ commit }, name) {
    const added = await axios.post(environment.api, { name });
    commit('addedTodos', added.data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  addedTodos: (state, todos) => { 
    state.todos = [ ...state.todos, todos ];
    return state.todos;
  },
  deleteTodos: (state, ids) => ( state.todos = state.todos.filter(todo => !ids.includes(todo.id)) ) ,
};

export default {
  state,
  getters,
  actions,
  mutations,
}