<template>
  <div class="cadastro-container">
    <!-- Cabeçalho -->
    <div class="header">
      <h4>Vendly - Cadastro Produto</h4>
    </div>

    <!-- Formulário de Cadastro de Produto -->
    <div class="produto-registration">
      <form @submit.prevent="inserir">
        <div class="form-group">
          <label for="id">Codigo Produto <span>*</span></label>
          <input type="text" id="id" v-model="produto.id" placeholder="Codigo do Produto"  />
          <small v-if="errors.id" class="error">{{ errors.id }}</small>
        </div>

        <div class="form-group">
          <label for="nome">Título Produto <span>*</span></label>
          <input type="text" id="nome" v-model="produto.nome" placeholder="Título do Produto" required />
          <small v-if="errors.nome" class="error">{{ errors.nome }}</small>
        </div>

        <div class="form-group">
          <label for="descricao">Descrição <span>*</span></label>
          <textarea id="descricao" v-model="produto.descricao" placeholder="Descrição do Produto" maxlength="300" required></textarea>
          <small v-if="errors.descricao" class="error">{{ errors.descricao }}</small>
        </div>

        <div class="form-group">
          <label for="quantidade">Quantidade em Estoque <span>*</span></label>
          <input type="number" id="quantidade" v-model="produto.quantidade" placeholder="Quantidade" required />
          <small v-if="errors.quantidade" class="error">{{ errors.quantidade }}</small>
        </div>

        <div class="form-group">
          <label for="preco">Valor <span>*</span></label>
          <input type="number" id="preco" v-model="produto.preco" placeholder="R$" required />
          <small v-if="errors.preco" class="error">{{ errors.preco }}</small>
        </div>

        <div class="form-group">
          <label for="imagem">Imagem do Produto </label>
          <input type="file" id="imagem" @change="onImageSelected" accept="imagem/*" />
          <small v-if="errors.imagem" class="error">{{ errors.imagem }}</small>
          <div v-if="produto.imagem">
            <img :src="produto.imagem" alt="Pré-visualização da imagem" style="max-width: 200px; margin-top: 10px;" />
          </div>
        </div>

        <button type="submit" class="submit-button">Cadastrar</button>
        <button @click.prevent="alterar(produto.id)" class="submit-button">Alterar</button>
        <button @click.prevent="excluir(produto.id)" class="submit-button delete-button">Excluir</button>
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
      produto: {
        id: '',
        nome: '',
        descricao: '',
        quantidade: '',
        preco: '',
        imagem: ''
      },
      errors: {},
      debouncedCheckProduto: null, // Armazena a função debounce
    };
  },
  created() {
    // Inicializa a função debounce com atraso de 500ms
    this.debouncedCheckProduto = debounce(this.checkProduto, 500);
  },
  watch: {
    // Monitora o campo 'id' para verificar se o produto já existe
    'produto.id'(newId) {
      if (newId) {
        // Executa a função com debounce para aguardar a digitação terminar
        this.debouncedCheckProduto(newId);
      }
    }
  },
  methods: {
    // Método para verificar se o produto já existe
    async checkProduto(newId) {
      try {
        // Faz uma requisição GET para verificar se o produto com o ID informado já existe
        const response = await axios.get(`https://5599-189-112-39-185.ngrok-free.app/produtos/${newId}`);

        // Se o produto for encontrado, preenche os campos do formulário com as informações
        if (response.data) {
          this.produto.nome = response.data.nome;
          this.produto.descricao = response.data.descricao;
          this.produto.quantidade = response.data.quantidade;
          this.produto.preco = response.data.preco;
          this.produto.imagem = "https://5599-189-112-39-185.ngrok-free.app" + response.data.imagem;
          alert('Produto encontrado e formulário preenchido.');
        } else {
          // Se não houver dados no retorno
          this.clearForm();
          this.produto.id = newId;
          alert('Produto não encontrado. Preencha os dados para cadastrar.');
        }
      } catch (error) {
        // Se o produto não for encontrado, limpa os campos para permitir um novo cadastro
        this.clearForm();
        this.produto.id = newId; // Mantém o código preenchido
        alert('Produto não encontrado. Preencha os dados para cadastrar.');
      }
    },
    
    // Método para limpar o formulário
    clearForm() {
      this.produto = {
        id: '', // Mantém o código do produto
        nome: '',
        descricao: '',
        quantidade: '',
        preco: '',
        imagem: ''
      };
    },

    // Método para cadastrar o produto e enviar para o db.json via API
    async inserir() {
      this.errors = {}; // Limpa os erros antes de verificar o formulário

      // Simulação de validação
      if (!this.produto.nome) {
        this.errors.nome = 'O título do produto é obrigatório';
      }
      if (!this.produto.descricao) {
        this.errors.descricao = 'A descrição do produto é obrigatória';
      }
      if (!this.produto.quantidade) {
        this.errors.quantidade = 'A quantidade em quantidade é obrigatória';
      }
      if (!this.produto.preco) {
        this.errors.preco = 'O valor do produto é obrigatório';
      }

      // Se não houver erros, simula o envio do formulário
      if (Object.keys(this.errors).length > 0) {
        return;
      }

      try {
        // Verificar se já existe um produto com o mesmo ID
        const response = await axios.get(`https://5599-189-112-39-185.ngrok-free.app/produtos?id=${this.produto.id}`);

        // Se o produto já existir, impedir o cadastro
        if (response.data.length > 0) {
          alert('Produto já cadastrado com este código. Use um código diferente.');
          return;
        }
          // Enviar o produto para o db.json usando a API do json-server
          await axios.post('https://5599-189-112-39-185.ngrok-free.app/produtos', this.produto);

          alert(this.produto.nome + ' cadastrado com sucesso!');

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
        await axios.put(`https://5599-189-112-39-185.ngrok-free.app/produtos/${id}`, this.produto);

        alert(this.produto.nome + ' atualizado com sucesso!');
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
          this.produto.imagem = e.target.result; // Base64 ou caminho da imagem
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
        await axios.delete(`https://5599-189-112-39-185.ngrok-free.app/produtos/${id}`);

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
.produto-registration {
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
  .produto-registration {
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
