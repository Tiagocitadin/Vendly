<template>
  <div id="nav">
    <router-link to="/">Home</router-link>    
    <router-link to="/Products">Produtos</router-link> 
    <router-link to="/basket"> <img src="/src/img/carrinho-de-compras (1).png" alt="Carrinho de compra"> </router-link> 
  </div>
  <router-view/>
</template>


<script>
  export default {
    created(){
      this.$store.dispatch('loadProducts');
    }
 
  }  
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1280px;
  margin: 80px auto;
}

#nav {
  padding: 16px 0;
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
    padding: 0 10px;
  }
}
</style>
