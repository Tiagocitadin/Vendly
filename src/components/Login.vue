<template>
    <div class="login-page">
      <!-- Cabeçalho -->
      <div class="login">
        <h4>Vendly - Login</h4>
      </div>
  
      <!-- Formulário de Login -->
      <div class="login-container">
        <h2>Entre na sua conta</h2>

        <form @submit.prevent="handleLogin">

          <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
          </div>

          <div class="input-group">
            <label for="password">Senha:</label>
            <input type="password" id="password" v-model="password" required>
          </div>

          <button type="submit">Entrar</button>
        </form>

        <p class="register-link">
          Não tem uma conta? <router-link to="/cadastrocliente">Cadastre-se aqui</router-link>
        </p>


      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: ""
      };
    },
    methods: {
    ...mapActions(['redirectToCadastro']),

    validateEmail(email) {
      // Expressão regular para validar formato de email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },

    validatePassword(password) {
      // Verifica se a senha tem pelo menos 6 caracteres
      return password.length >= 6;
    },

    handleLogin() {
      // Validação do email e senha
      if (!this.validateEmail(this.email)) {
        alert("Por favor, insira um email válido.");
        return;
      }

      if (!this.validatePassword(this.password)) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
      }

      // Se passar na validação, redireciona para a página de cadastro
        this.$router.push('/cadastrocliente');     
    }
  }
};
  </script>
  
  <style scoped>
 /* Página de login */
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Arial', sans-serif;
  position: relative;
}

/* Estilização do cabeçalho */
.login{
  text-align: center;
  margin-bottom: 20px;
}

.login h4 {
  font-size: 28px;
  color: #333;
  font-weight: bold;
  margin: 0; /* Remove a margem extra */
  top: 10%; /* Ajuste conforme necessário */
  text-align: center;
}

/* Container de login */
.login-container {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  z-index: 1;
  position: relative;
}

.login-container h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
}

/* Grupo de inputs */
.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
}

.input-group input:focus {
  border-color: #5c6bc0;
}

/* Botão de login */
button[type="submit"] {
  width: 100%;
  padding: 14px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #3b4cb8;
}

/* Link de cadastro */
.register-link {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.register-link a {
  color: #5c6bc0;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

  </style>
  