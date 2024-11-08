<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/produto
    ">Produtos</router-link>
    <router-link to="/carrinho" class="carrinho-link">
      <div class="carrinho-icon">
        <img src="/src/img/carrinho-de-compras (1).png" alt="Carrinho de compra" />
        <span class="cart-count" v-if="produtosCarrinho.length > 0">
          ({{ produtosCarrinho.length }})
        </span>
      </div>
    </router-link>
    
      <!-- Lista de Produtos -->
    <div class="produto
    -list">
      <div v-for="produto
       in filteredProdutos" :key="produto.id" class="produto-item">
        <h3>{{ produto.nome }}</h3>
        <p>{{ produto.descricao }}</p>
        <p>Preço: R$ {{ produto.preco.toFixed(2) }}</p>
      </div>
    </div>

    <router-link to="/login">Olá, faça seu Login</router-link>
  </div>
</template>


<script>
import axios from 'axios'; // Importa Axios para fazer requisições HTTP

export default {
  data() {
    return {
      searchQuery: '', // Termo de busca inserido pelo usuário
      produtos: [], // Produtos serão carregados a partir da API
    };
  },
  computed: {
    // Obtém os produtos que estão no carrinho de compras a partir do Vuex Store
    produtosCarrinho() {
      return this.$store.state.produtosCarrinho;
    },
    
    // Filtra os produtos com base no termo de busca
    filteredProdutos() {
      // Se o campo de busca estiver vazio, retorna todos os produtos
      if (!this.searchQuery) {
        return this.produtos;
      }
      
      // Converte o termo de busca para minúsculas e filtra pelo título ou descrição
      const searchTerm = this.searchQuery.toLowerCase();
      return this.produtos.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm) ||
        produto.descricao.toLowerCase().includes(searchTerm)
      );
    }
  },
  methods: {
    // Método para buscar os produtos da API local
    fetchProdutos() {
      axios.get('http://localhost:5500/produtos') // Requisição GET para a API local
        .then(response => {
          this.produtos = response.data.produtos; // Armazena os produtos recebidos da API
        })
        .catch(error => {
          console.error('Erro ao buscar produtos:', error); // Exibe erro no console, se houver
        });
    },
    
    // Método de busca (opcional, já que a busca é feita dinamicamente)
    searchProdutos() {
      // Não é necessário fazer nada, pois a busca é dinâmica com o v-model
    }
  },
  
  // Faz a requisição à API assim que o componente é montado
  mounted() {
    this.fetchProdutos();
  }
}
</script>


<style lang="scss">
#nav {
  display: flex;
  justify-content: space-around; /* Divide os links de forma igual no espaço disponível */
  align-items: center; /* Alinha os itens verticalmente ao centro */
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: #333;
  color: white;
  padding: 10px;
  
  a {
    color: white;
    text-decoration: none;
    font-size: 18px; /* Aumenta um pouco o tamanho do texto */
    margin: 0 20px; /* Adiciona um espaçamento mínimo entre os links */
  
    &.router-link-exact-active {
      color: #007bff; /* Cor para o link ativo */
    }
  }

  img {
    width: 24px;
    height: 24px;
  }
  .carrinho-link {
  position: relative;
  display: flex;
  align-items: center;
}

.carrinho-icon {
  position: relative;
  display: inline-block;
}

.carrinho-icon img {
  width: 40px; /* Ajuste o tamanho da imagem do carrinho conforme necessário */
  height: auto;
}

.cart-count {
  position: absolute;
  top: -10px; /* Ajuste a posição vertical do contador */
  right: -30px; /* Ajuste a posição horizontal do contador */
  background-color: #ff0000;
  color: #fff;
  font-size: 14px;
  padding: 2px 6px;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
}

}
</style>
