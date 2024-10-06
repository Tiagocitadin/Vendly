import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },

  mutations: {
    // Carrega os produtos no estado
    loadProducts(state, products) {     
      state.products = products;
    },

    loadBag(state, products) {     
      state.productsInBag = products;
    },

    addToBag(state, product) {
      state.productsInBag.push(product);
    },

    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(item => productId != item.id);
      state.productsInBag = updatedBag;     
    },
  },

  actions: {
    // Carrega os produtos usando uma API
    loadProducts({ commit }) {
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          commit('loadProducts', response.data);
        });
    },   

    addToBag({ commit }, product) {
      commit('addToBag', product);
    },
    
    removeFromBag({ commit }, productId) {
      if ((confirm('Deseja Remover?'))) {
        commit('removeFromBag', productId);
      }
      
    }
  },

  modules: {
    // Caso você queira adicionar módulos Vuex, eles vão aqui
  }
});
