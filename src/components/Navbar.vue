<template>
    <div id="nav">
      <router-link to="/">Home</router-link>    
      <router-link to="/products">Produtos</router-link> 
      <router-link to="/basket">
        <img src="/src/img/carrinho-de-compras (1).png" alt="Carrinho de compra" />
      </router-link> 
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  };
  </script>
  
  <style lang="scss">
  
  #nav {
    padding: 10px 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background-color: rgb(37, 37, 37);
    color: white;
    
    
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
  