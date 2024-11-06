import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    produtos: [],
    produtosCarrinho: []
  },

  mutations: {
    carregarProdutos(state, produtos) {     
      state.produtos = produtos;
    },

    adicionarAoCarrinho(state, produto) {
      state.produtosCarrinho.push(produto);
    },

    removerDoCarrinho(state, produtoId) {
      const updatedBag = state.produtosCarrinho.filter(item => produtoId !== item.id);
      state.produtosCarrinho = updatedBag;
    },
  },

  actions: {
    // Carrega os produtos usando a API local na porta 5500
    carregarProdutos({ commit }) {
      axios
        .get('https://localhost:5500/produtos')  // Certifique-se de que este é o caminho correto da API
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
