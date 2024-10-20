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
          <label for="id">Codigo Produto <span>*</span></label>
          <input type="text" id="id" v-model="product.id" placeholder="Codigo do Produto" required />
          <small v-if="errors.id" class="error">{{ errors.id }}</small>
        </div>

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
        <button @click.prevent="alterar(product.id)" class="submit-button">Alterar</button>
        <button @click.prevent="excluir(product.id)" class="submit-button delete-button">Excluir</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// Função debounce para atrasar a execução da verificação
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default {
  data() {
    return {
      product: {
        id: '',
        title: '',
        description: '',
        estoque: '',
        price: '',
        image: ''
      },
      errors: {},
      debouncedCheckProduct: null, // Armazena a função debounce
    };
  },
  created() {
    // Inicializa a função debounce com atraso de 500ms
    this.debouncedCheckProduct = debounce(this.checkProduct, 500);
  },
  watch: {
    // Monitora o campo 'id' para verificar se o produto já existe
    'product.id'(newId) {
      if (newId) {
        // Executa a função com debounce para aguardar a digitação terminar
        this.debouncedCheckProduct(newId);
      }
    }
  },
  methods: {
    // Método para verificar se o produto já existe
    async checkProduct(newId) {
      try {
        // Faz uma requisição GET para verificar se o produto com o ID informado já existe
        const response = await axios.get(`http://localhost:5500/produtos/${newId}`);

        // Se o produto for encontrado, preenche os campos do formulário com as informações
        if (response.data) {
          this.product.title = response.data.title;
          this.product.description = response.data.description;
          this.product.estoque = response.data.estoque;
          this.product.price = response.data.price;
          this.product.image = response.data.image;
          alert('Produto encontrado e formulário preenchido.');
        } else {
          // Se não houver dados no retorno
          this.clearForm();
          this.product.id = newId;
          alert('Produto não encontrado. Preencha os dados para cadastrar.');
        }
      } catch (error) {
        // Se o produto não for encontrado, limpa os campos para permitir um novo cadastro
        this.clearForm();
        this.product.id = newId; // Mantém o código preenchido
        alert('Produto não encontrado. Preencha os dados para cadastrar.');
      }
    },
    
    // Método para limpar o formulário
    clearForm() {
      this.product = {
        id: '', // Mantém o código do produto
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
      if (Object.keys(this.errors).length > 0) {
        return;
      }

      try {
        // Verificar se já existe um produto com o mesmo ID
        const response = await axios.get(`http://localhost:5500/produtos?id=${this.product.id}`);

        // Se o produto já existir, impedir o cadastro
        if (response.data.length > 0) {
          alert('Produto já cadastrado com este código. Use um código diferente.');
          return;
        }
          // Enviar o produto para o db.json usando a API do json-server
          await axios.post('http://localhost:5500/produtos', this.product);

          alert(this.product.title + ' cadastrado com sucesso!');

          // Limpa o formulário após o cadastro
          this.clearForm();
          
        } catch (error) {
          console.error('Erro ao cadastrar o produto: ', error);
          alert('Erro ao cadastrar o produto');
        
      }
    
    },

    // Método para alterar o produto
    async alterar(id) {
      if (!id) {
        alert('Código do produto necessário para alteração.');
        return;
      }

      try {
        // Faz a requisição PUT para alterar o produto existente
        await axios.put(`http://localhost:5500/produtos/${id}`, this.product);

        alert(this.product.title + ' atualizado com sucesso!');
        this.clearForm();
      } catch (error) {
        console.error('Erro ao alterar o produto: ', error);
        alert('Erro ao alterar o produto');
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
    },

    // Método para excluir um produto
    async excluir(id) {
      if (!id) {
        alert('Código do produto necessário para exclusão.');
        return;
      }
      try {
        // Faz a requisição DELETE para o servidor, removendo o produto com o id fornecido
        await axios.delete(`http://localhost:5500/produtos/${id}`);

        confirm('Deseja !');
        this.clearForm();
      } catch (error) {
        console.error('Erro ao excluir o produto: ', error);
        alert('Erro ao excluir o produto');
      }
    }
  }
};
</script>

<style>

.cadastro-container {
  max-width: 50%;
  margin: 0 auto;
  padding: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #333;
}

/* Cabeçalho */
.header h4 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #007bff;
  font-weight: bold;
  text-transform: uppercase;
}

/* Grid principal do formulário */
.product-registration {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
}

/* Estilo dos grupos de campo */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 5px;
}

/* Rótulos */
.form-group label {
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  padding: 5px;
}

/* Inputs e Textareas */
.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="file"],
.form-group textarea {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s;
}

.form-group input[type="text"]:focus,
.form-group input[type="number"]:focus,
.form-group textarea:focus {
  border-color: #007bff;
  outline: none;
}

/* Ajustando a área da imagem */
.form-group img {
  max-width: 150px;
  margin-top: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
}

/* Estilizando os botões */
.submit-button {
  padding: 12px 20px;
  font-size: 14px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button.delete-button {
  background-color: #e74c3c;
}

.submit-button.delete-button:hover {
  background-color: #c0392b;
}

/* Layout para vários botões */
.form-group-buttons {
  grid-column: span 4;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.form-group-buttons button {
  width: 100%;
}

/* Responsividade */
@media (max-width: 768px) {
  .product-registration {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .form-group-buttons {
    flex-direction: column;
  }

  .submit-button {
    width: 100%;
    margin-top: 10px;
  }
}

</style>
