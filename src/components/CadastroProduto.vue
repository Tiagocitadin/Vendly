<template>
  <div class="cadastro-container">
    <div class="header">
      <h4>{{ isEditing ? 'Editar Produto' : 'Cadastrar Produto' }}</h4>
    </div>

    <div class="product-registration">
      <form @submit.prevent="inserirOuAtualizar">
        <div class="form-group">
          <label for="id">Código do Produto</label>
          <input type="text" id="id" v-model="produto.id" :disabled="isEditing" placeholder="Código do Produto" required />
        </div>

        <div class="form-group">
          <label for="nome">Título do Produto</label>
          <input type="text" id="nome" v-model="produto.nome" placeholder="Título do Produto" required />
        </div>

        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea id="descricao" v-model="produto.descricao" placeholder="Descrição do Produto" required></textarea>
        </div>

        <div class="form-group">
          <label for="quantidade">Quantidade</label>
          <input type="number" id="quantidade" v-model="produto.quantidade" placeholder="Quantidade" required />
        </div>

        <div class="form-group">
          <label for="preco">Preço (R$)</label>
          <input type="number" id="preco" v-model="produto.preco" placeholder="Preço" required />
        </div>

        <button type="submit" class="submit-button">{{ isEditing ? 'Atualizar' : 'Cadastrar' }}</button>
        <button @click.prevent="voltarParaLista" class="cancel-button">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      produto: {
        id: '',
        nome: '',
        descricao: '',
        quantidade: '',
        preco: ''
      },
      isEditing: false
    };
  },
  methods: {

    created() {
  this.buscarProdutos();
},
    async buscarProduto() {
      const produtoId = this.$route.query.id;
      if (produtoId) {
        try {
          const response = await axios.get(`http://localhost:5500/produtos/${produtoId}`);
          this.produto = response.data;
          this.isEditing = true;
        } catch (error) {
          console.error("Erro ao buscar produto:", error);
        }
      }
    },
    async inserirOuAtualizar() {
      try {
        if (this.isEditing) {
          await axios.put(`http://localhost:5500/produtos/${this.produto.id}`, this.produto);
          alert('Produto atualizado com sucesso!');
        } else {
          await axios.post('http://localhost:5500/produtos', this.produto);
          alert('Produto cadastrado com sucesso!');
        }
        this.voltarParaLista();
      } catch (error) {
        console.error("Erro ao salvar produto:", error);
      }
    },
    voltarParaLista() {
      this.$router.push({ path: '/listaCadastro' }); // Redireciona para a lista de produtos
    }
  },
  created() {
    this.buscarProduto();
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
