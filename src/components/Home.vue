<template>
    <div class="home">
      <h1>Bem-vindo à nossa loja!</h1>
             
      </div>    
  </template>
  
  <script>  

  
  export default {    
    
  
  };
  </script>
  
  <style lang="scss">
  .home {
    text-align: center;
    padding: 40px 0;
  
    .carousel-container {
      max-width: 800px;
      margin: auto;
    }
  
    .product-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      border: 1px solid #eee;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
  
      .product-image {
        width: 150px;
        height: 150px;
        background-size: cover;
        background-position: center;
        border-radius: 8px;
      }
  
      h4 {
        margin: 20px 0 10px;
        font-size: 18px;
      }
  
      .price {
        font-size: 20px;
        font-weight: bold;
        color: #007bff;
      }
  
      .description {
        font-size: 14px;
        color: #666;
        margin: 10px 0;
      }
  
      button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
  
        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }
  </style>
  