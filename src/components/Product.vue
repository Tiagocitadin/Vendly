<template>
  <div class="produtos">
    <div class="products">
      <div v-for="(product, index) in products" :key="index" class="product" :class="{inBag : isInBag(product)}">
        <div class="product-image" :style="{backgroundImage: 'url(' + product.image + ')'}">
        </div>

        <div>
          <h4>{{ product.title }}</h4>
          <p>{{ product.description }}</p>
        </div>

        <div>
          <p class="price"> R$ {{ product.price.toFixed(2) }}</p> 
        </div>
     
        <div class="parcela">
          <p> 10x R$ {{ calculoParcela(product.price).toFixed(2) }}</p>
        </div>
    
        <button v-if="!isInBag(product)" @click="addToBag(product)">Adicionar ao Carrinho</button>  
        <button v-else class="remove" @click="removeFromBag(product.id)">Remover do Carrinho</button>     
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
    productsInBag() {
      return this.$store.state.productsInBag; // Obtém os produtos no carrinho
    }
  },

  methods: {
    addToBag(product) {
      product.quantity = 1;
      this.$store.dispatch('addToBag', product); // Adiciona o produto ao carrinho
    },
    
    removeFromBag(productId) {
      this.$store.dispatch('removeFromBag', productId); // Remove o produto do carrinho
    },
    
    isInBag(product) {
      return this.productsInBag.some(item => item.id === product.id); // Verifica se o produto já está no carrinho
    },
    
    calculoParcela(price) {
      const parcelas = 10;
      return price / parcelas; // Calcula o valor da parcela
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
  
      &.inBag {
        border: 1px solid #007bff;
      }
      
      .product-image {
        margin: 20px auto;
        width: 100%;
        height: 300px; /* Define uma altura fixa */
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #f0f0f0;
      }

      h4 {
        margin: 22px auto;
        font-size: 20px;
        max-width: 60%;
        font-weight: normal;
        text-align: center;
      }

      p.price {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
      }

      p.description {
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
