import { environment } from '../../environments/environment';
import axios from 'axios';

const state = {
  brands: [],
  selectedItem: null
};

const getters = {
  allBrands: (state) => state.brands,
  editSelectedItem: (state) => state.selectedItem
};

const actions = {
  async fetchBrands({ commit }) {
    const response = await axios.get(environment.api);
    commit('setBrands',response.data)
  },
  async removeBrand({ commit }, id) {
    await axios.delete(`${environment.api}/${id}`);
    commit('deleteBrand', id)
  },
  async addBrand({ commit }, name) {
    const added = await axios.post(environment.api, { name });
    commit('addedBrand', added.data);
  },
  async updateBrand({ commit }, brand) {
    const updated = await axios.put(`${environment.api}/${brand.id}`, { id: brand.id, name: brand.name });
    if(updated) commit('updatedBrand', brand);
  },
  selectItem({commit}, selectedItem) {
    console.log('HERE SELECTRD ITED', selectedItem);
    commit('selectedBrand', selectedItem)
  }
};

const mutations = {
  setBrands: (state, brands) => (state.brands = brands),
  addedBrand: (state, brand) => { 
    state.brands = [ ...state.brands, brand ];
    return state.brands;
  },
  updatedBrand: (state, updated) => {
    state.brands = state.brands.map(brand => brand.id !== updated.id ? brand : updated );
    return state.brands;
  },
  deleteBrand: (state, id) => ( state.brands = state.brands.filter(todo => id !== todo.id ) ) ,
  selectedBrand: (state, selectedItem) => ( state.selectedItem = selectedItem ) ,
};

export default {
  state,
  getters,
  actions,
  mutations,
}