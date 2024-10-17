<template>
    <div class="cadastro-container">
      <!-- Cabeçalho -->
      <div class="header">
        <h4>Vendly - Cadastro Cliente</h4>
      </div>
  
      <!-- Formulário de Cadastro de Produto -->
      <div class="product-registration">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="nome">Nome <span>*</span></label>
            <input type="text" id="nome" v-model="product.cod" placeholder="nome" required />
            <small v-if="errors.nome" class="error">{{ errors.nome }}</small>
          </div>
  
          <div class="form-group">
            <label for="email">Email <span>*</span></label>
            <input type="email" id="email" v-model="product.descricao" placeholder="email" required />
            <small v-if="errors.email" class="error">{{ errors.email }}</small>
          </div>

          <div class="form-group">
            <label for="senha">Senha <span>*</span></label>
            <input type="text" id="senha" v-model="product.preco" placeholder="*****" required />
            <small v-if="errors.senha" class="error">{{ errors.senha }}</small>
          </div>
  
          <div class="form-group">
            <label for="cpf">CPF <span>*</span></label>
            <input type="text" id="cpf" v-model="product.qtd" placeholder="000.000.000-00" required />
            <small v-if="errors.cpf" class="error">{{ errors.cpf }}</small>
          </div> 
         
          <div class="form-group">
            <label for="telefone">Telefone <span>*</span></label>
            <input type="text" id="telefone" v-model="product.qtd" placeholder="(xx)xxxxx-xxxx" required />
            <small v-if="errors.telefone" class="error">{{ errors.telefone }}</small>
          </div> 
    
  
          <button type="submit" class="submit-button">Cadastrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          nome: '',
          email: '',
          senha: '',
          cpf: '',
          telefone: ''
        },
        errors: {}
      };
    },
    methods: {
      // Método para limpar o formulário após o cadastro
      clearForm() {
        this.product = {
          nome: '',
          email: '',
          senha: '',
          cpf: '',
          telefone: ''
        };
      },
      
      // Método para cadastrar o produto e limpar o formulário após sucesso
      submitForm() {
        this.errors = {}; // Limpa os erros antes de verificar o formulário
  
        // Simulação de validação
        if (!this.product.nome) {
          this.errors.nome = 'O código do produto é obrigatório';
        }
        if (!this.product.email) {
          this.errors.email = 'A descrição do produto é obrigatória';
        }
        if (!this.product.senha) {
          this.errors.senha = 'A quantidade é obrigatória';
        }
        if (!this.product.cpf) {
          this.errors.cpf = 'O valor do produto é obrigatório';
        }
        if (!this.product.telefone) {
          this.errors.telefone = 'O valor do produto é obrigatório';
        }
  
        // Se não houver erros, simula o envio do formulário
        if (Object.keys(this.errors).length === 0) {
          // Simulação de envio de dados
          alert(this.product.descricao + ' cadastrado com sucesso!' );
  
          // Limpa o formulário após o cadastro
          this.clearForm();
        }
      }
    }
  };
  </script>
  
  <style>
  .cadastro-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 8px;
  }
  
  .header h4 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
  }
  
  .error {
    color: red;
    font-size: 12px;
  }
  
  .submit-button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  