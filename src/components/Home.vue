<template>
    <div class="home">
      <div class="container">
        <h4>Vendly Sua Loja Virtual</h4>
      </div>  
      
      <div class="banner">
        <img src="../assets/Processador Intel Core i5-12400F, 2.5GHz (4.4GHz Max Turbo), Cache 18MB, LGA 1700 - BX8071512400F.jpeg" alt="Banner da Loja" />
      </div>
  
      <!-- Seção de Produtos -->
      <div class="product-section">
        <h2>Confira nossos Produtos</h2>
        <div class="product-grid">
          <!-- Produto 1 -->
          <div class="product-item">
            <img src='../assets/Placa de Vídeo .jpeg' alt="Produto 1" />
            <h3>Produto 1</h3>
            <p>Descrição do produto 1</p>
            <span>R$ 100,00</span>
            <button >Adicionar ao Carrinho</button>
          </div>
          
          <!-- Produto 2 -->
          <div class="product-item">
            <img src="../assets/Placa de Vídeo RX 6600 CLD 8G ASRock AMD Radeon, 8GB, GDDR6 - 90-GA2RZZ-00UANF.jpeg" alt="Produto 2" />
            <h3>Produto 2</h3>
            <p>Descrição do produto 2</p>
            <span>R$ 150,00</span>
            <button>Adicionar ao Carrinho</button>
          </div>
          
          <!-- Produto 3 -->
          <div class="product-item">
            <img src="../assets/Placa Mãe Gigabyte B550M Aorus Elite (rev. 1.3), AMD AM4, Micro ATX, DDR4 - B550M AORUS ELITE.jpeg" alt="Produto 3" />
            <h3>Produto 3</h3>
            <p>Descrição do produto 3</p>
            <span>R$ 200,00</span>
            <button>Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>     
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage",
    data(){
        return{

        }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos Gerais */
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  
  /* Container */
  .container {
    text-align: center;
    padding: 20px;
  }
  
  h4 {
    color: #333;
    font-size: 24px;
    margin-top: 20px;
  }
  
  /* Banner */
  .banner {
    text-align: center;
    margin: 20px 0;
  }
  
  .banner img {
    max-width: 100%;
    height: auto;
  }
  
  /* Seção de Produtos */
  .product-section {
    padding: 20px;
  }
  
  .product-section h2 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 0 50px;
  }
  
  .product-item {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    text-align: center;
    border-radius: 5px;
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
  }
  
  .product-item span {
    display: block;
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  
  button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  /* Estilos do Rodapé */
  .footer {
    background-color: #333;
    color: #fff;
    padding: 20px 0;
    text-align: center;
    margin-top: 50px;
  }
  
  .footer-container p {
    margin: 0;
    font-size: 14px;
  }
  </style>
  