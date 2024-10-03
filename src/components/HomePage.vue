<template>
    <div class="home">
      <div class="products">

        <div  
        v-for="(product, index) in this.products" :key="index"
         class="product" >
          <div class="product-image" :style="{backgroundImage: 'url(' + product.image + ')'}">
          </div>
          <h4>{{ product.title }}</h4>
          <p class="price"> {{'R$ ' +  product.price.toFixed(2) }}</p>
          <p class="description">{{ product.description }}</p>
          <button>Adicione Carrinho</button>
        </div>
      
      </div>
    </div>
  </template>
  
  <script>
  import Products from './Products.vue';
  
  export default {
    name: 'HomePage',
  
    computed: {
      products() {
        return this.$store.state.products;
      }
    }
  }
  </script>
  
  <style lang="scss">
  
    .home {
  
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
          }
  
          p.price {
            font-size: 20px;
            font-weight: bold;
          }

          p.description {
          font-size: 12px;
          color: #555; /* Cor de texto mais suave */
          line-height: 1.4;
          margin: 8px 0;
          max-width: 100%; /* Permitir que a descrição ocupe toda a largura disponível */
          text-align: justify;
          overflow: hidden; /* Esconde o conteúdo que ultrapassar o limite */
          text-overflow: ellipsis; /* Adiciona reticências (...) no final do texto, caso ultrapasse o limite */
          max-height: 60px; /* Limita a altura para manter o layout compacto */
      }
  
          button {
            flex-direction: column;
            color: #fff;
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 100px;
            font-weight: 400;
            text-align: center;
            padding: 8px 16px;
            cursor: pointer;
            margin-top: 60px; /* Isso empurra o botão para o final */
  
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
  