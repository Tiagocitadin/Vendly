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
      const produtoExistente = state.produtosCarrinho.find(item => item.id === produto.id);
      
      if (produtoExistente) {
        produtoExistente.quantidade += 1; // Incrementa a quantidade se o produto já estiver no carrinho
      } else {
        state.produtosCarrinho.push({ ...produto, quantidade: 1 }); // Adiciona o produto com quantidade inicial
      }
    },

    removerDoCarrinho(state, produtoId) {
      state.produtosCarrinho = state.produtosCarrinho.filter(item => produtoId !== item.id);
    },
  },

  actions: {
    // Carrega os produtos usando a API local na porta 5500
    carregarProdutos({ commit }) {
      axios
        .get('https://c088-189-112-39-185.ngrok-free.app/produtos')  // Utilize http:// para uma API local
        .then(response => {
          commit('carregarProdutos', response.data);
        })
        .catch(error => {
          console.error('Erro ao carregar produtos:', error);
        });
    },   

    adicionarAoCarrinho({ commit }, produto) {
      commit('adicionarAoCarrinho', produto);
    },
    
    removerDoCarrinho({ commit }, produtoId) {
      const confirmacao = confirm('Deseja remover este item?');
      if (confirmacao) {
        commit('removerDoCarrinho', produtoId);
      }
    },
  },

  getters: {
    totalCarrinho(state) {
      return state.produtosCarrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
    },

    quantidadeTotalCarrinho(state) {
      return state.produtosCarrinho.reduce((total, item) => total + item.quantidade, 0);
    }
  }
});
