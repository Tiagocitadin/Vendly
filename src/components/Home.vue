<template>
  <div class="home">
    <!-- Cabeçalho -->
    <div class="homePage">
      <h1 class="animatedTitle">Vendly - A Plataforma Completa para Vender Produtos de PC</h1>
      <h4 class="animatedSubtitle">Seu marketplace especializado em tecnologia, pronto para impulsionar suas vendas online</h4>    
    </div>  
    <div class="carousel">
      <div class="carousel-container" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <!-- Iterar sobre a lista de produtos mais vendidos com v-for -->
        <div class="carousel-item" v-for="(produto, index) in maisVendidos" :key="index">
          <img :src="produto.imagem" :alt="produto.nome" />
          <h3>{{ produto.nome }}</h3>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      produtos: [], // Array para armazenar os produtos carregados
      currentIndex: 0, // Índice atual do carrossel
      intervalId: null // Armazena o ID do intervalo para o carrossel automático
    };
  },
  computed: {
    // Filtra os produtos que têm a propriedade maisVendido como true
    maisVendidos() {
      return this.produtos.filter(produto => produto.maisVendido);
    }
  },
  methods: {
    produtosHome() {
      axios
        .get('http://localhost:5500/produtos') // Certifique-se de que o json-server está rodando nesta porta
        .then(response => {
          this.produtos = response.data; // Armazena os produtos na propriedade 'produtos'
        })
        .catch(error => {
          console.error('Erro ao carregar produtos: ', error);
        });
    },
    startCarousel() {
      // Inicia o carrossel automático
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.maisVendidos.length;
      }, 3000); // Troca a cada 3 segundos
    },
    stopCarousel() {
      // Para o carrossel automático
      clearInterval(this.intervalId);
    }
  },
  mounted() {
    this.produtosHome(); // Carrega os produtos ao montar o componente
    this.startCarousel(); // Inicia o carrossel automático
  },
  beforeDestroy() {
    this.stopCarousel(); // Para o carrossel quando o componente for destruído
  }
};
</script>

<style>
/* Estilo Geral */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #333;
}

/* Estilo do Container Principal */
.home {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Estilo do Cabeçalho */
.homePage {
  background-color: #333;
  color: #fff;
  padding: 30px 20px;
  text-align: center;
  width: 100%;
}

.animatedTitle {
  font-size: 36px;
  margin: 0;
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInUp 1s ease-in-out forwards;
}

.animatedSubtitle {
  font-size: 18px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 2s ease-in-out forwards;
  animation-delay: 0.5s;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilo do Carrossel */
.carousel {
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.carousel-container {
  display: flex;
  transition: transform 0.5s

}
</style>
