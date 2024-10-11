import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },

  mutations: {
    loadProducts(state, products) {     
      state.products = products;
    },

    addToBag(state, product) {
      state.productsInBag.push(product);
    },

    removeFromBag(state, productId) {
      const updatedBag = state.productsInBag.filter(item => productId !== item.id);
      state.productsInBag = updatedBag;
    },
  },

  actions: {
    // Carrega os produtos usando a API local na porta 5500
    loadProducts({ commit }) {
      axios
        .get('http://localhost:5500/produtos')  // Certifique-se de que este é o caminho correto da API
        .then(response => {
          commit('loadProducts', response.data);
        })
        .catch(error => {
          console.error('Erro ao carregar produtos: ', error);
        });
    },   

    addToBag({ commit }, product) {
      commit('addToBag', product);
    },
    
    removeFromBag({ commit }, productId) {
      if (confirm('Deseja remover este item?')) {
        commit('removeFromBag', productId);
      }
    },
  },

  modules: {
    // Aqui você pode adicionar módulos Vuex adicionais, se necessário
  }
});
