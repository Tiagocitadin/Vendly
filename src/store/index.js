import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
  products: [],
  produtosCarrinho: []
  },

  mutations: {
    loadProducts(state, products) {
      state.products = products;
    },
    addCarrinho(state, product) {
      state.productsAddCarrinho.push(product);
    },
    
  },

  actions: {
    loadProducts( {commit} ) {
      axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
      commit('loadProducts', response.data);
        })
    },
    addCarrinho({ commit}, product) {
      commit('addCarrinho', product);
    }
  },
  modules: {
  }
})
