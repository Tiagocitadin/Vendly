<template>
  <div id="nav">
    <router-link to="/">Home</router-link>    
    <router-link to="/product">Produtos</router-link>        
    <router-link to="/basket">
      <img src="/src/img/carrinho-de-compras (1).png" alt="Carrinho de compra" />
      ({{ productsInBag.length }})
    </router-link> 
    <router-link to="/login">Login</router-link>
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

### CSS Ajustado:

```scss
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
}
</style>
