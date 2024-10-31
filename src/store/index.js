import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    produtosCarrinho: []
  },

  mutations: {
    carregarProdutos(state, products) {     
      state.products = products;
    },

    adicionarAoCarrinho(state, product) {
      state.produtosCarrinho.push(product);
    },

    removerDoCarrinho(state, productId) {
      const updatedBag = state.produtosCarrinho.filter(item => productId !== item.id);
      state.produtosCarrinho = updatedBag;
    },
  },

  actions: {
    // Carrega os produtos usando a API local na porta 5500
    carregarProdutos({ commit }) {
      axios
        .get('https://5599-189-112-39-185.ngrok-free.app/produtos')  // Certifique-se de que este é o caminho correto da API
        .then(response => {
          commit('carregarProdutos', response.data);
        })
        .catch(error => {
          console.error('Erro ao carregar produtos: ', error);
        });
    },   

    adicionarAoCarrinho({ commit }, product) {
      commit('adicionarAoCarrinho', product);
    },
    
    removerDoCarrinho({ commit }, productId) {
      if (confirm('Deseja remover este item?')) {
        commit('removerDoCarrinho', productId);
      }
    },
  },

 
});
