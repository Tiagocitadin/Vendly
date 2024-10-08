<template>
    <div id="nav">
      <router-link to="/">Home</router-link>    
      <router-link to="/product">Produtos</router-link> 
      <router-link to="/basket">
        <img src="/src/img/carrinho-de-compras (1).png" alt="Carrinho de compra" />({{ this.productsInBag.length }})
      </router-link> 
    </div>
  </template>
  
  <script>
  export default {
      computed: {
        productsInBag() {
      return this.$store.state.productsInBag;
    }
      }
  
  }
  </script>
  
  <style lang="scss">
  
  #nav {
  position: fixed; /* Garante que a navbar fique no topo da página */
  top: 0;
  width: 100%;
  z-index: 1000; /* Coloca a navbar acima de todos os outros elementos */
  background-color: #333;
  color: white;
  padding: 10px;
    
    
    a {
      color: white;
      text-decoration: none;
      margin: 0 200px;
  
      &.router-link-exact-active {
        color: #007bff;
      }
    }
  
    img {
      width: 24px;
      height: 24px;
    }
  }
  </style>
  