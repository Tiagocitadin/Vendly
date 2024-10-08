<template>
  <div class="home">
    <!-- Cabeçalho -->
    <div class="products">
      <h4>Vendly Sua Loja Virtual</h4>
    </div>  

    <!-- Carrossel de Produtos -->
    <div class="product-carousel">
      <swiper :slides-per-view="3" space-between="30" navigation pagination>
        <swiper-slide v-for="(product, index) in products" :key="index">
          <div class="product-slide-item">

            <img :src="product.image" :alt="product.name" />
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <span>{{ product.price }}</span>            
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Seção de Produtos -->
    <div class="product-section">
      <h2>Confira nossos Produtos</h2>
      <div class="product-grid">
        <!-- Produto 1 -->
        <div class="product-item">
          <img src="../assets/Placa de Vídeo .jpeg" alt="Produto 1" />
          <h3>Placa de Vídeo ZTech GTX 3070 - Alto Desempenho para Jogos e Gráficos</h3>
          <p>Marca/Modelo: ZTech GTX 3070 Super Edition
            Memória: 8GB GDDR6 Conectividade: HDMI, DisplayPort, USB-C Estado: Usado, em perfeito estado de funcionamento
            Garantia: 6 meses de garantia pelo fabricante Compatibilidade: Ideal para jogos de última geração como Cyber
            Assault, renderização 3D em software como Blender, edição de vídeos em 4K, e outras tarefas gráficas intensivas.
            Outras informações: Acompanha caixa original, manual e todos os cabos inclusos.</p>
          <span>R$ 2.800,00</span>       
        </div>
        <!-- Produto 2 -->
        <div class="product-item">
          <img src="../assets/Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6 - 90-GA2RZZ-00UANF.jpeg" alt="Produto 2" />
          <h3>Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon - Excelente para Jogos e Aplicações Gráficas</h3>
          <p>Marca/Modelo: ASRock AMD Radeon RX 6600 CLD 8G Memória: 8GB GDDR6 Conectividade: HDMI 2.1, DisplayPort 1.4a Estado:
            Novo, lacrado na caixa Garantia: Garantia de 1 ano pelo fabricante Compatibilidade: Perfeito para jogos de última
            geração, como Call of Duty e Fortnite, além de softwares de edição e renderização em alta resolução, como Adobe
            Premiere e AutoCAD. Outras informações: Modelo 90-GA2RZZ-00UANF, acompanha caixa original, cabos e manual.</p>
          <span>R$ 3.200,00</span>          
        </div>

        <div class="product-item">
          <img src="../assets/Processador Intel Core i5-12400F, 2.5GHz (4.4GHz Max Turbo), Cache 18MB, LGA 1700 - BX8071512400F.jpeg" alt="">
          <h3>Processador Intel Core i5-12400F, 2.5GHz (4.4GHz Max Turbo), Cache 18MB, LGA 1700</h3>
          <p>Marca/Modelo: Intel Core i5-12400F - BX8071512400F
              Velocidade Base: 2.5GHz (4.4GHz Max Turbo)
              Cache: 18MB Intel Smart Cache
              Socket: LGA 1700
              Núcleos/Threads: 6 núcleos / 12 threads
              Estado: Novo, lacrado na caixa
              Garantia: Garantia de 1 ano pelo fabricante
              Compatibilidade: Ideal para PCs de alto desempenho, desde jogos até multitarefas pesadas, com excelente eficiência em programas de edição e renderização.
              Outras Informações: Suporte para DDR4 e DDR5, sem placa gráfica integrada (necessita de uma GPU dedicada).</p>
              <span>R$ 1.200,00</span>              
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      products: [
        {
          image: "../assets/Placa de Vídeo .jpeg",
          name: "Placa de Vídeo ZTech GTX 3070",
          description: "Alto desempenho para jogos e gráficos intensivos.",
          price: "R$ 2.800,00"
        },
        {
          image: "../assets/Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6 - 90-GA2RZZ-00UANF.jpeg",
          name: "Placa de Vídeo RX 6600 CLD 8G",
          description: "Excelente para Jogos e Aplicações Gráficas",
          price: "R$ 3.200,00"
        },
        {
          image: "../assets/Placa Mãe Gigabyte B550M Aorus Elite (rev. 1.3), AMD AM4, Micro ATX, DDR4 - B550M AORUS ELITE.jpeg",
          name: "Placa Mãe Gigabyte B550M Aorus Elite",
          description: "Compatível com processadores AMD AM4",
          price: "R$ 750,00"
        }
      ]
    };
  }
};
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
  padding: 20px;
}

h4 {
  color: #333;
  font-size: 24px;
  margin-top: 20px;
}

/* Carrossel */
.product-carousel {
  margin: 20px 0;
  padding: 0 50px;
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
  gap: 20px;
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

/* Rodapé */
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  margin-top: auto; /* Garante que o rodapé fique no final da página */
}
</style>
