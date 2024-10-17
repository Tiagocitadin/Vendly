<template>
  <div class="cadastro-container">
    <!-- Cabeçalho -->
    <div class="header">
      <h4>Vendly - Cadastro Produto</h4>
    </div>

    <!-- Formulário de Cadastro de Produto -->
    <div class="product-registration">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="cod">Código Produto <span>*</span></label>
          <input type="number" id="cod" v-model="product.cod" placeholder="COD" required />
          <small v-if="errors.cod" class="error">{{ errors.cod }}</small>
        </div>

        <div class="form-group">
          <label for="descricao">Descrição <span>*</span></label>
          <input type="text" id="descricao" v-model="product.descricao" placeholder="Descrição do Produto" required />
          <small v-if="errors.descricao" class="error">{{ errors.descricao }}</small>
        </div>

        <div class="form-group">
          <label for="qtd">Quantidade <span>*</span></label>
          <input type="number" id="qtd" v-model="product.qtd" placeholder="Quantidade" required />
          <small v-if="errors.qtd" class="error">{{ errors.qtd }}</small>
        </div>

        <div class="form-group">
          <label for="preco">Valor <span>*</span></label>
          <input type="number" id="preco" v-model="product.preco" placeholder="R$" required />
          <small v-if="errors.preco" class="error">{{ errors.preco }}</small>
        </div>

        <div class="form-group">
          <label for="image">Imagem do Produto <span>*</span></label>
          <input type="file" id="image" @change="onImageSelected" accept="image/*" required />
          <small v-if="errors.image" class="error">{{ errors.image }}</small>
          <div v-if="product.image">
            <img :src="product.image" alt="Pré-visualização da imagem" style="max-width: 200px; margin-top: 10px;" />
  </div>
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
        cod: '',
        descricao: '',
        qtd: '',
        preco: ''
      },
      errors: {}
    };
  },
  methods: {
    // Método para limpar o formulário após o cadastro
    clearForm() {
      this.product = {
        cod: '',
        descricao: '',
        qtd: '',
        preco: ''
      };
    },
    
    // Método para cadastrar o produto e limpar o formulário após sucesso
    submitForm() {
      this.errors = {}; // Limpa os erros antes de verificar o formulário

      // Simulação de validação
      if (!this.product.cod) {
        this.errors.cod = 'O código do produto é obrigatório';
      }
      if (!this.product.descricao) {
        this.errors.descricao = 'A descrição do produto é obrigatória';
      }
      if (!this.product.qtd) {
        this.errors.qtd = 'A quantidade é obrigatória';
      }
      if (!this.product.preco) {
        this.errors.preco = 'O valor do produto é obrigatório';
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
