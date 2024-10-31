<template>
  <div id="app">
    <NavBar />    

    <router-view />

    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';



export default {
  components: {
    NavBar,
    Footer,   
  },
 
  created() {
    this.$store.dispatch('carregarProdutos');
  },

created() {
    this.$store.dispatch('carregarProdutos');
    document.nome = "Vendly"; 
  }
};
</script>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;

  
}
</style>
