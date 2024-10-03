<template>
  <div id="app">
    <NavBar />    

    <router-view />

    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'; 
import Footer from './footer.vue';


export default {
  components: {
    NavBar,
    Footer
  },
 
  created() {
    this.$store.dispatch('loadProducts');
  }
};
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
</style>
