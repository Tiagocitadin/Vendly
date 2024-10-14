<template>
  <div class="home">
    <!-- Cabeçalho -->
    <div class="homePage">
      <h4>Vendly Sua Loja Virtual</h4>
    </div>  

 
    <!-- Seção de Produtos -->
    <div class="product-section">
      <h2>Produtos Mais Vendidos</h2>
      <div class="product-grid">
        <!-- Iterar sobre a lista de produtos com v-for -->
        <div class="product-item" v-for="(product, index) in products" :key="index">
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.title }}</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Product',
  data() {
    return {
    }
  },

  computed: {    
    products() {
      return this.$store.state.products;
    }

   
  },

  methods: {
   
    
     }
}
</script>
<style >

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  min-height: 100vh; /* Garante que o body ocupe pelo menos 100% da altura da janela */
  display: flex;
  flex-direction: column;
}

/* Wrapper para garantir que o conteúdo principal ocupe o espaço correto */
.home {
  flex-grow: 1; /* Garante que o conteúdo cresça até empurrar o rodapé para baixo */
}

/* Cabeçalho */
.products {
  text-align: center;
  padding: 5px;
}

h4 {
  color: #333;
  font-size: 24px;
  margin-top: 20px;
}


.product-slide-item {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
}

.product-slide-item img {
  max-width: 100%;
  height: auto;
}

.product-slide-item h3 {
  margin: 10px 0;
  font-size: 18px;
}

.product-slide-item p {
  color: #777;
  font-size: 14px;
}

.product-slide-item span {
  display: block;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

/* Seção de Produtos */
.product-section {
  padding: 20px;
  margin-bottom: 100px; /* Adiciona espaço suficiente para que o rodapé não seja sobreposto */
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
}

.product-item {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-item img {
  max-width: 100%;
  height: auto;
}

.product-item h3 {
  margin: 10px 0;
  font-size: 18px;
}

.product-item p {
  color: #777;
  font-size: 14px;
  flex-grow: 1;
}

.product-item span {
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
</style>
