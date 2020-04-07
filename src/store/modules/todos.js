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
  async removeTodos({ commit }, id) {
    await axios.delete(environment.api, { params: { id: id } });
    commit('deleteTodos', id)
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
  deleteTodos: (state, id) => ( state.todos = state.todos.filter(todo => id !== todo.id ) ) ,
};

export default {
  state,
  getters,
  actions,
  mutations,
}