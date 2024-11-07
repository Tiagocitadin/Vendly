<template>
  <div class="produtos">
    <div class="produtos">
      <div
        v-for="(produto, index) in produtos"
        :key="index"
        class="produto"
        :class="{ noCarrinho: produtoNoCarrinho(produto) }"
      >
        <div
          class="produto-imagem"
          :style="{ backgroundImage: `url(https://c088-189-112-39-185.ngrok-free.app/${produto.imagem})` }"
        ></div>

        <div>
          <h4>{{ produto.nome }}</h4>
          <p class="descricao">{{ produto.descricao }}</p>
        </div>

        <div>
          <p class="preco">R$ {{ produto.preco }}</p>
        </div>

        <div class="parcela">
             <p>{{ calculoParcela(produto.preco).numeroParcelas }}x R$ {{ calculoParcela(produto.preco).valorParcela.toFixed(2) }}</p>
        </div>

        <button
          v-if="!produtoNoCarrinho(produto)"
          @click="adicionarAoCarrinho(produto)"
        >
          Adicionar ao Carrinho
        </button>
        <button
          v-else
          class="remove"
          @click="removerDoCarrinho(produto.id)"
        >
          Remover do Carrinho
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Produtos',
  computed: {
    produtos() {
      return this.$store.state.produtos; // Obtém os produtos do state
    },
    produtosCarrinho() {
      return this.$store.state.produtosCarrinho; // Obtém os produtos no carrinho
    }
  },

  methods: {
    adicionarAoCarrinho(produto) {
      produto.quantidade = 1;
      this.$store.dispatch('adicionarAoCarrinho', produto); // Adiciona o produto ao carrinho
    },

    removerDoCarrinho(produtoId) {
      this.$store.dispatch('removerDoCarrinho', produtoId); // Remove o produto do carrinho
    },

    produtoNoCarrinho(produto) {
      return this.produtosCarrinho.some(item => item.id === produto.id); // Verifica se o produto já está no carrinho
    },

    calculoParcela(preco) {
  let parcelas;
  if (preco <= 1000) {
    parcelas = 10;
  } else {
    parcelas = 12;
  }
  return {
    numeroParcelas: parcelas,
    valorParcela: preco / parcelas
  };
}

  },

mounted() {
  // Carrega os produtos toda vez que o componente é montado
  this.$store.dispatch('carregarProdutos');
}

};
</script>

<style lang="scss">
.produtos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .produto {
    flex: 0 0 30%;
    box-sizing: border-box;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 16px;
    margin: 8px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media only screen and (max-width: 769px) {
      flex: 0 0 40%;
    }

    @media only screen and (max-width: 640px) {
      flex: 0 0 90%;
    }

    &.noCarrinho {
      border: 1px solid #007bff;
    }

    .produto-imagem {
      margin: 20px auto;
      width: 100%;
      height: 300px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
    }

    h4 {
      margin: 22px auto;
      font-size: 20px;
      max-width: 60%;
      font-weight: normal;
      text-align: center;
    }

    .preco {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }

    .descricao {
      font-size: 12px;
      color: #555;
      line-height: 1.4;
      margin: 8px 0;
      max-width: 100%;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 60px;
    }

    .parcela {
      font-size: 15px;
      text-align: center;
    }

    button {
      color: #fff;
      background-color: #007bff;
      border: 1px solid #007bff;
      border-radius: 100px;
      font-weight: 400;
      text-align: center;
      padding: 8px 16px;
      cursor: pointer;
      margin-top: auto;

      &:hover {
        opacity: 0.8;
      }

      &.remove {
        background-color: transparent;
        border: none;
        color: black;
        text-decoration: underline;
      }
    }
  }
}
</style>
