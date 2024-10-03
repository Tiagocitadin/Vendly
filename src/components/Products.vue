<template>
  <div class="produtos">
    <div class="products">

      <div  
      v-for="(product, index) in this.products" :key="index"
       class="product" >
        <div class="product-image" :style="{backgroundImage: 'url(' + product.image + ')'}">
        </div>
        <h4>{{ product.title }}</h4>
        <p class="price"> {{'R$ ' +  product.price.toFixed(2) }}</p>
        <p class="description">{{ product.description }}</p>
        <button>Adicionar Carrinho</button>
      </div>
    
    </div>
  </div>
</template>

<script>


export default {
  name: 'Products',

  computed: {
    products() {
      return this.$store.state.products;
    }
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
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: space-between; /* Alinha os elementos com espaçamento flexível */
  
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
        width: 160px;
        height: 140px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }

      h4 {
        margin: 22px auto;
        font-size: 12px;
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

      button {
        color: #fff;
        background-color: #007bff;
        border: 1px solid #007bff;
        border-radius: 100px;
        font-weight: 400;
        text-align: center;
        padding: 8px 16px;
        cursor: pointer;
        margin-top: auto; /* Esse ajuste empurra o botão para a parte inferior */

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



