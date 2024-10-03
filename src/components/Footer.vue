<template>
    <footer id="footer">
      <div class="footer-content">
        <p>&copy; 2024 Vendly. Todos os direitos reservados.</p>
        <div class="social-icons">
          <a href="https://facebook.com" target="_blank">Facebook</a> |
          <a href="https://whatsapp.com/" target="_blank">whatsapp</a> |
          <a href="https://instagram.com" target="_blank">Instagram</a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };

  </script>
  
  <style scoped lang="scss">

  #footer {
    background-color: #252525;
    color: white;
    padding: 15px ;
    text-align: center;
    bottom: 0;
    width: 100%;
    
  }
  
  .footer-content {
    max-width: 1280px;
    margin: 0 auto;
  }
  
  p {
    margin: 0;
    padding: 0;
  }
  
  .social-icons {
    margin-top: 10px;
  }
  
  a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: #007bff;
  }
  </style>
  