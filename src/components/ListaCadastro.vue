<template>
    <div class="produto-container">
      <div class="header">
        <h4>Vendly - Relatório de Produtos</h4>
        <button @click="irParaCadastro" class="add-button">Cadastrar Novo Produto</button>
      </div>
  
      <table class="report-table" v-if="produtos.length">
        <thead>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Preço (R$)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtos" :key="produto.id">
            <td>{{ produto.id }}</td>
            <td>{{ produto.nome }}</td>
            <td>{{ produto.descricao }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>{{ produto.preco }}</td>
            <td class="action-buttons">
              <button @click="editarProduto(produto)" class="edit-button">Editar</button>
              <button @click="excluir(produto.id)" class="delete-button">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <p v-if="!produtos.length" class="no-products">Nenhum produto cadastrado.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        produtos: []
      };
    },
    methods: {
      irParaCadastro() {
        this.$router.push({ path: '/cadastroproduto' });
      },
      async buscarProdutos() {
        try {
          const response = await axios.get('http://localhost:5500/produtos');
          this.produtos = response.data;
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      },
      editarProduto(produto) {
        this.$router.push({ path: '/cadastroproduto', query: { id: produto.id } });
      },
      async excluir(id) {
        try {
          await axios.delete(`http://localhost:5500/produtos/${id}`);
          this.produtos = this.produtos.filter(produto => produto.id !== id);
        } catch (error) {
          console.error("Erro ao excluir produto:", error);
        }
      }
    },
    // Busca a lista de produtos toda vez que o componente é montado
    created() {
      this.buscarProdutos();
    }
  };
  </script>
  
 <style scoped>
 
 .page-container {
    display: flex;
    flex-direction: column;
   
  }
  
  .produto-container {
    max-width: 80%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    flex: 1; /* Faz com que o conteúdo principal ocupe o espaço restante */
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  h4 {
    font-size: 24px;
    color: #333;
  }
  
  .add-button {
    background-color: #28a745;
    color: #fff;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .add-button:hover {
    background-color: #218838;
  }
  
  .report-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  
  .report-table th,
  .report-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .report-table th {
    background-color: #007bff;
    color: white;
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
  }
  
  .report-table td {
    font-size: 13px;
    color: #555;
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
  
  .edit-button,
  .delete-button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    color: #fff;
  }
  
  .edit-button {
    background-color: #007bff;
  }
  
  .delete-button {
    background-color: #e74c3c;
  }
  
  .edit-button:hover {
    background-color: #0056b3;
  }
  
  .delete-button:hover {
    background-color: #c0392b;
  }
  
  .no-products {
    text-align: center;
    font-style: italic;
    color: #666;
    margin-top: 20px;
  }
  

 </style>
 