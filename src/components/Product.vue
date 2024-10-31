<template>
  <div class="produtos">
    <div class="products">
      
      <div v-for="(product, index) in products" :key="index" class="product" :class="{noCarrinho : produtoNoCarrinho(product)}">
        <div class="product-imagem" :style="{backgroundImage: 'url(https://5599-189-112-39-185.ngrok-free.app' + product.imagem + ')'}">
        </div>

        <div>
          <h4>{{ product.nome }}</h4>
          <p>{{ product.descricao }}</p>
        </div>

        <div>
          <p class="preco"> R$ {{ product.preco }}</p> 
        </div>
     
        <div class="parcela">
          <p> 10x R$ {{ calculoParcela(product.preco).toFixed(2) }}</p>
        </div>
    
        <button v-if="!produtoNoCarrinho(product)" @click="adicionarAoCarrinho(product)">Adicionar ao Carrinho</button>  
        <button v-else class="remove" @click="removerDoCarrinho(product.id)">Remover do Carrinho</button>     
      </div>       
    </div> 
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {};
  },

  computed: {    
    products() {
      return this.$store.state.products; // Obtém os produtos do state
    },
    produtosCarrinho() {
      return this.$store.state.produtosCarrinho; // Obtém os produtos no carrinho
    }
  },

  methods: {
    adicionarAoCarrinho(product) {
      product.quantidade = 1;
      this.$store.dispatch('adicionarAoCarrinho', product); // Adiciona o produto ao carrinho
    },
    
    removerDoCarrinho(productId) {
      this.$store.dispatch('removerDoCarrinho', productId); // Remove o produto do carrinho
    },
    
    produtoNoCarrinho(product) {
      return this.produtosCarrinho.some(item => item.id === product.id); // Verifica se o produto já está no carrinho
    },
    
    calculoParcela(preco) {
      const parcelas = 10;
      return preco / parcelas; // Calcula o valor da parcela
    }
  },

  // Chama a action para buscar os produtos do db.json
  created() {
    this.$store.dispatch('fetchProducts'); // Garante que os produtos sejam buscados ao criar o componente
  }
}
</script>

<style lang="scss">
.produtos {
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .product {
      flex: 0 0 30%;
      box-sizing: border-box;  
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      padding: 16px;
      margin: 8px;
      height: 700px;
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
      
      .product-imagem {
        margin: 20px auto;
        width: 100%;
        height: 300px; /* Define uma altura fixa */
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
       
      }

      &:hover {
        transform: scale(1.05); /* Aumenta levemente o card */
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3); /* Aumenta a sombra */
      }

      h4 {
        margin: 22px auto;
        font-size: 20px;
        max-width: 60%;
        font-weight: normal;
        text-align: center;
      }

      p.preco {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
      }

      p.descricao {
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
}
</style>
