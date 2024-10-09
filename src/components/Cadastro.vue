<template>
    <div class="cadastro-container">
      <!-- Cabeçalho -->
      <div class="header">
        <h4>Vendly - Cadastro de Cliente</h4>
      </div>
  
      <!-- Formulário de Cadastro de Cliente -->
      <div class="customer-registration">
         <h3>Complete o formulário abaixo para se cadastrar na nossa plataforma.</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nome Completo <span>*</span></label>
            <input type="text" id="name" v-model="customer.name" placeholder="Digite seu nome completo" required />
            <small v-if="errors.name" class="error">{{ errors.name }}</small>
          </div>

          <div class="form-group">
            <label for="cpf">CPF <span>*</span></label>
            <input type="text" id="name" v-model="customer.cpf" placeholder="000.000.000-00" required />
            <small v-if="errors.cpf" class="error">{{ errors.cpf }}</small>
          </div>
  
          <div class="form-group">
            <label for="email">E-mail <span>*</span></label>
            <input type="email" id="email" v-model="customer.email" placeholder="Digite seu e-mail" required />
            <small v-if="errors.email" class="error">{{ errors.email }}</small>
          </div>
  
          <div class="form-group">
            <label for="phone">Telefone <span>*</span></label>
            <input type="tel" id="phone" v-model="customer.phone" placeholder="(XX) XXXXX-XXXX" required />
            <small v-if="errors.phone" class="error">{{ errors.phone }}</small>
          </div>
  
          <div class="form-group">
            <label for="address">Endereço <span>*</span></label>
            <input type="text" id="address" v-model="customer.address" placeholder="Digite seu endereço completo" required />
            <small v-if="errors.address" class="error">{{ errors.address }}</small>
          </div>  
          
          <button type="submit" class="submit-button">Cadastrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CustomerRegistration",
    data() {
      return {
        customer: {
          name: "",
          cpf: "",
          email: "",
          phone: "",
          address: ""
        },
        errors: {}
      };
    },
    methods: {
      submitForm() {
        this.validateForm();
        if (Object.keys(this.errors).length === 0) {
          console.log('Cliente cadastrado:', this.customer);
          alert(`Cliente ${this.customer.name} cadastrado com sucesso!`);
          this.resetForm();
        }
      },
      validateForm() {
        this.errors = {};
        if (!this.customer.name) {
          this.errors.name = "Nome completo é obrigatório.";
        }
        if (!this.customer.cpf) {
          this.errors.cpf = "CPF é obrigatório.";
        }
        if (!this.customer.email || !this.isValidEmail(this.customer.email)) {
          this.errors.email = "E-mail inválido.";
        }
        if (!this.customer.phone || this.customer.phone.length < 10) {
          this.errors.phone = "Telefone inválido.";
        }
        if (!this.customer.address) {
          this.errors.address = "Endereço é obrigatório.";
        }
        
      },
      isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      },
      resetForm() {
        this.customer = {
          name: "",
          cpf: "",
          email: "",
          phone: "",
          address: ""         
        };
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos principais */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  padding: 0;
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Estrutura de página */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
 
}

.cadastro-container {
  flex-grow: 1; /* Garante que o conteúdo principal preencha o espaço disponível */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  
}

.header {
  text-align: center;
  margin-bottom: 50px;

}

.header h4 {
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

/* Estilos do formulário */
.customer-registration {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.customer-registration h2 {
  font-size: 24px;
  color: #333;
  text-align: center;
}

.customer-registration p {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
 padding: 5px;
  
}

.form-group label {
  font-size: 14px;
  color: #333;
  display: block;
  margin-bottom: 5px;
 
}

.form-group label span {
  color: red;
  
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: border-color 0.3s;
  
}

.form-group input:focus {
  border-color: #007BFF;
  
}

.form-group small {
  color: red;
  display: block;
  margin-top: 5px;

}

.submit-button {
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

  </style>
  