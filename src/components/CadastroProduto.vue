<template>
  <div class="cadastro-container">
    <!-- Cabeçalho -->
    <div class="header">
      <h4>Vendly - Cadastro Produto</h4>
    </div>

    <!-- Formulário de Cadastro de Produto -->
    <div class="product-registration">
      <form @submit.prevent="inserir">
        <div class="form-group">
          <label for="title">Título Produto <span>*</span></label>
          <input type="text" id="title" v-model="product.title" placeholder="Título do Produto" required />
          <small v-if="errors.title" class="error">{{ errors.title }}</small>
        </div>

        <div class="form-group">
          <label for="description">Descrição <span>*</span></label>
          <textarea id="description" v-model="product.description" placeholder="Descrição do Produto" required></textarea>
          <small v-if="errors.description" class="error">{{ errors.description }}</small>
        </div>

        <div class="form-group">
          <label for="estoque">Quantidade em Estoque <span>*</span></label>
          <input type="number" id="estoque" v-model="product.estoque" placeholder="Quantidade" required />
          <small v-if="errors.estoque" class="error">{{ errors.estoque }}</small>
        </div>

        <div class="form-group">
          <label for="price">Valor <span>*</span></label>
          <input type="number" id="price" v-model="product.price" placeholder="R$" required />
          <small v-if="errors.price" class="error">{{ errors.price }}</small>
        </div>

        <div class="form-group">
          <label for="image">Imagem do Produto </label>
          <input type="file" id="image" @change="onImageSelected" accept="image/*" />
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
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        title: '',
        description: '',
        estoque: '',
        price: '',
        image: ''
      },
      errors: {}
    };
  },
  methods: {
    // Método para limpar o formulário após o cadastro
    clearForm() {
      this.product = {
        title: '',
        description: '',
        estoque: '',
        price: '',
        image: ''
      };
    },
    
    // Método para cadastrar o produto e enviar para o db.json via API
    async inserir() {
      this.errors = {}; // Limpa os erros antes de verificar o formulário

      // Simulação de validação
      if (!this.product.title) {
        this.errors.title = 'O título do produto é obrigatório';
      }
      if (!this.product.description) {
        this.errors.description = 'A descrição do produto é obrigatória';
      }
      if (!this.product.estoque) {
        this.errors.estoque = 'A quantidade em estoque é obrigatória';
      }
      if (!this.product.price) {
        this.errors.price = 'O valor do produto é obrigatório';
      }

      // Se não houver erros, simula o envio do formulário
      if (Object.keys(this.errors).length === 0) {
        try {
          // Enviar o produto para o db.json usando a API do json-server
          await axios.post('http://localhost:5500/produtos', this.product);

          alert(this.product.title + ' cadastrado com sucesso!');

          // Limpa o formulário após o cadastro
          this.clearForm();
          
        } catch (error) {
          console.error('Erro ao cadastrar o produto: ', error);
          alert('Erro ao cadastrar o produto');
        }
      }
    },
    
    // Função para lidar com a imagem selecionada
    onImageSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.product.image = e.target.result; // Base64 ou caminho da imagem
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>


<style>
/* Contêiner principal */
.cadastro-container {
  max-width: 700px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

/* Cabeçalho */
.header h4 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

/* Grupos de formulário */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: border-color 0.3s, box-shadow 0.3s;
}

/* Efeito ao focar no campo */
.form-group input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.1);
  outline: none;
}

/* Exibição de mensagens de erro */
.error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

/* Botão de envio */
.submit-button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  margin-top: 15px;
}

/* Efeito hover no botão */
.submit-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
}

/* Imagem pré-visualizada */
.product-registration img {
  max-width: 200px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Legenda obrigatória */
.form-group label span {
  color: #e74c3c;
}

/* Responsividade para telas menores */
@media (max-width: 768px) {
  .cadastro-container {
    padding: 20px;
  }

  .header h4 {
    font-size: 20px;
  }

  .submit-button {
    font-size: 14px;
  }
}
</style>
