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
                  <input type="text" id="nome" v-model="product.nome" placeholder="Nome" required />
                  <small v-if="errors.nome" class="error">{{ errors.nome }}</small>
              </div>

              <div class="form-group">
                  <label for="email">Email <span>*</span></label>
                  <input type="email" id="email" v-model="product.email" placeholder="Email" required />
                  <small v-if="errors.email" class="error">{{ errors.email }}</small>
              </div>

              <div class="form-group">
                  <label for="senha">Senha <span>*</span></label>
                  <input type="password" id="senha" v-model="product.senha" placeholder="*****" required />
                  <small v-if="errors.senha" class="error">{{ errors.senha }}</small>
              </div>

              <div class="form-group">
                  <label for="cpf">CPF <span>*</span></label>
                  <input type="text" id="cpf" v-model="product.cpf" placeholder="000.000.000-00" required />
                  <small v-if="errors.cpf" class="error">{{ errors.cpf }}</small>
              </div>

              <div class="form-group">
                  <label for="telefone">Telefone <span>*</span></label>
                  <input type="text" id="telefone" v-model="product.telefone" placeholder="(xx)xxxxx-xxxx" required />
                  <small v-if="errors.telefone" class="error">{{ errors.telefone }}</small>
              </div>

              <div class="form-group">
                  <label for="endereco">Endereço</label>
                  <input type="text" id="endereco" name="endereco" placeholder="Endereço">
              </div>

              <div class="form-group">
                  <label for="cidade">Cidade</label>
                  <input type="text" id="cidade" name="cidade" placeholder="Cidade">
              </div>

              <div class="form-group">
                  <label for="estado">Estado</label>
                  <input type="text" id="estado" name="estado" placeholder="Estado">
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
              this.errors.nome = 'O nome é obrigatório';
          }
          if (!this.product.email) {
              this.errors.email = 'O email é obrigatório';
          }
          if (!this.product.senha) {
              this.errors.senha = 'A senha é obrigatória';
          }
          if (!this.product.cpf) {
              this.errors.cpf = 'O CPF é obrigatório';
          }
          if (!this.product.telefone) {
              this.errors.telefone = 'O telefone é obrigatório';
          }

          // Se não houver erros, simula o envio do formulário
          if (Object.keys(this.errors).length === 0) {
              // Simulação de envio de dados
              alert(this.product.nome + ' cadastrado com sucesso!');

              // Limpa o formulário após o cadastro
              this.clearForm();
          }
      }
  }
};
</script>

<style>
/* Contêiner principal */
.cadastro-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background-color: #f4f7f9;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* Cabeçalho */
.header h4 {
  text-align: center;
  font-size: 24px;
  color: #333;
  font-weight: 600;
  letter-spacing: 1.2px;
  margin-bottom: 30px;
  text-transform: uppercase;
}

/* Grupos de formulário */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  padding: 12px 15px;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  background-color: #fff;
  transition: all 0.3s ease;
  outline: none;
}

/* Efeito ao focar no campo */
.form-group input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.1);
}

/* Estilizando o campo de arquivo */
.form-group input[type="file"] {
  padding: 5px;
  border: none;
}

/* Exibição de mensagens de erro */
.error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;
}

/* Botão de envio */
.submit-button {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  letter-spacing: 0.8px;
  margin-top: 20px;
}

/* Efeito hover e interação no botão */
.submit-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

/* Botão pressionado */
.submit-button:active {
  transform: translateY(0);
}

/* Imagem pré-visualizada */
.product-registration img {
  max-width: 200px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Adicionando um destaque ao campo obrigatório */
.form-group label span {
  color: #e74c3c;
}

/* Ajuste de espaçamento entre grupos de campos */
.form-group {
  margin-bottom: 25px;
}

/* Responsividade para telas menores */
@media (max-width: 768px) {
  .cadastro-container {
    padding: 30px;
  }

  .header h4 {
    font-size: 22px;
  }

  .submit-button {
    font-size: 14px;
    padding: 12px;
  }
}


</style>
