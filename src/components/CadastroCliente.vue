<template>
  <div class="cadastro-container">
    <!-- Cabeçalho -->
    <div class="header">
      <h4>Vendly - Cadastro Cliente</h4>
    </div>

    <!-- Busca por CPF -->
    <div class="form-container">
      <div class="form-row">
        <div class="form-group full-width">
          <label for="cpf-busca">Buscar Cliente Cadastrado por CPF</label>
          <input type="text" id="cpf-busca" v-model="cpfBusca" placeholder="Digite o CPF" />
          <button class="submit-button" @click="buscarClientePorCpf">Buscar</button>
        </div>
      </div>
    </div>

    <!-- Formulário de Cadastro de Cliente -->
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="form-row">     

          <div class="form-group half-width">
            <label for="nome">Nome <span>*</span></label>
            <input type="text" id="nome" v-model="cliente.nome" placeholder="Nome" required />
            <small v-if="errors.nome" class="error">{{ errors.nome }}</small>
          </div>

          <div class="form-group half-width">
            <label for="cpf">CPF <span>*</span></label>
            <input type="text" id="cpf" v-model="cliente.cpf" placeholder="000.000.000-00" required />
            <small v-if="errors.cpf" class="error">{{ errors.cpf }}</small>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group half-width">
            <label for="email">Email <span>*</span></label>
            <input type="email" id="email" v-model="cliente.email" placeholder="Email" required />
            <small v-if="errors.email" class="error">{{ errors.email }}</small>
          </div>

          <div class="form-group half-width">
            <label for="telefone">Telefone <span>*</span></label>
            <input type="text" id="telefone" v-model="cliente.telefone" placeholder="(xx)xxxxx-xxxx" required />
            <small v-if="errors.telefone" class="error">{{ errors.telefone }}</small>
          </div>
        </div>

        <!-- Campo de CEP e Número -->
        <div class="form-row">
          <div class="form-group half-width">
            <label for="cep">CEP </label>
            <input type="text" id="cep" v-model="cliente.cep" @blur="consultarCep" placeholder="CEP" />
            <small v-if="errors.cep" class="error">{{ errors.cep }}</small>
          </div>

          <div class="form-group half-width">
            <label for="numero">Número </label>
            <input type="text" id="numero" v-model="cliente.numero" placeholder="Número" />
            <small v-if="errors.numero" class="error">{{ errors.numero }}</small>
          </div>
        </div>

        <!-- Preenchimento automático após inserir CEP -->
        <div class="form-row">
          <div class="form-group half-width">
            <label for="endereco">Endereço<span>*</span></label>
            <input type="text" id="endereco" v-model="cliente.endereco" placeholder="Endereço" required />
          </div>

          <div class="form-group half-width">
            <label for="bairro">Bairro<span>*</span></label>
            <input type="text" id="bairro" v-model="cliente.bairro" placeholder="Bairro" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group half-width">
            <label for="cidade">Cidade<span>*</span></label>
            <input type="text" id="cidade" v-model="cliente.cidade" placeholder="Cidade" required />
          </div>

          <div class="form-group half-width">
            <label for="estado">Estado<span>*</span></label>
            <input type="text" id="estado" v-model="cliente.estado" placeholder="Estado" required />
          </div>
        </div>
      </form>
    </div>

    <!-- Botões para interagir com o cliente -->
    <div class="action-buttons">
      <button class="submit-button" @click="cadastrarCliente" v-if="!isEditing">Cadastrar Cliente</button>
      <button class="edit-button" @click="editarCliente" v-if="isEditing">Salvar Alterações</button>
      <button class="delete-button" @click="excluirCliente" v-if="isEditing">Excluir Cliente</button>
      <button class="cancel-button" @click="clearForm" v-if="isEditing">Cancelar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cliente: {
        id: '',
        nome: '',
        email: '',        
        cpf: '',
        telefone: '',
        endereco: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        numero: ''
      },
      cpfBusca: '',
      clientes: [],
      errors: {},
      isEditing: false,
    };
  },

  created() {
    this.carregarClientes();
  },

  methods: {
    // Carregar a lista de clientes
    async carregarClientes() {
      try {
        const response = await axios.get('http://localhost:5500/clientes');
        this.clientes = response.data;
      } catch (error) {
        console.error('Erro ao carregar clientes: ', error);
      }
    },

    // Buscar cliente pelo CPF
buscarClientePorCpf() {
  if (!this.cpfBusca.trim()) {
    alert('Preencha o campo de busca.');
    return;
  }
  // Fazendo uma requisição GET ao servidor que hospeda o db.json
  fetch(`http://localhost:5500/clientes?cpf=${this.cpfBusca}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação');
      }
      return response.json();
    })
    .then(data => {
      // O "data" será o array de clientes encontrados
      if (data.length > 0) {
        this.cliente = { ...data[0] };  // Pega o primeiro cliente encontrado
        console.log('Cliente encontrado com ID:', this.cliente.id); // Verifica se o ID foi carregado
        this.isEditing = true;  // Ativa o modo de edição
      } else {
        alert('Cliente não encontrado.');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao buscar o cliente.');
    });
},

// Editar cliente
async editarCliente() {
  if (!this.cliente.id) {
    alert('Nenhum cliente selecionado para edição.');
    return;
  }
  console.log('Cliente a ser editado com ID:', this.cliente.id); // Verifica se o ID está presente
  try {
    // Faz a requisição para editar o cliente usando fetch
    const response = await fetch(`http://localhost:5500/clientes/${this.cliente.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.cliente) // Envia o objeto cliente atualizado no corpo da requisição
    });

    if (!response.ok) {
      throw new Error('Erro ao alterar cliente');
    }

    alert('Cliente alterado com sucesso!');
    this.clearForm();
    this.carregarClientes();
  } catch (error) {
    console.error('Erro ao alterar cliente: ', error);
    alert('Erro ao alterar cliente. Verifique os detalhes no console.');
  }
},


    // Método para consultar o CEP e preencher automaticamente os campos de endereço
    async consultarCep() {
  const cep = this.cliente.cep.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (cep.length !== 8) {
    this.errors.cep = 'CEP inválido.';
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (!response.ok) {
      throw new Error('Erro na consulta do CEP.');
    }

    const data = await response.json();

    if (data.erro) {
      this.errors.cep = 'CEP não encontrado.';
      return;
    }

    this.cliente.endereco = data.logradouro;
    this.cliente.bairro = data.bairro;
    this.cliente.cidade = data.localidade;
    this.cliente.estado = data.uf;
    this.errors.cep = ''; // Limpa o erro de CEP se os dados forem preenchidos com sucesso
  } catch (error) {
    this.errors.cep = 'Erro ao consultar o CEP.';
  }
},


    // Cadastrar cliente
    async cadastrarCliente() {
  this.errors = {}; // Limpa os erros

  // Verifica se os campos obrigatórios estão preenchidos
  if (!this.cliente.nome) {
    this.errors.nome = 'O nome é obrigatório';
    return;
  }

  try {
    // Verifica se já existe um cliente cadastrado e qual o maior ID
    const maiorId = this.clientes.length > 0 ? Math.max(...this.clientes.map(cliente => cliente.id || 0)) : 0;

    // Define um novo ID para o cliente
    this.cliente.id = maiorId + 1;

    // Faz a requisição para cadastrar o cliente usando fetch
    const response = await fetch('http://localhost:5500/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.cliente) // Converte o objeto cliente para JSON
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar cliente');
    }

    alert('Cliente cadastrado com sucesso!');

    // Limpa o formulário e recarrega a lista de clientes
    this.clearForm();
    this.carregarClientes();
  } catch (error) {
    console.error('Erro ao cadastrar cliente: ', error);
  }
},

// Editar cliente
async editarCliente() {
  if (!this.cliente.id) {
    alert('Nenhum cliente selecionado para edição.');
    return;
  }
  console.log('Cliente a ser editado com ID:', this.cliente.id); // Verifica se o ID está presente
  try {
    // Faz a requisição para editar o cliente usando fetch
    const response = await fetch(`http://localhost:5500/clientes/${this.cliente.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.cliente) // Envia o objeto cliente atualizado no corpo da requisição
    });

    if (!response.ok) {
      throw new Error('Erro ao alterar cliente');
    }

    alert('Cliente alterado com sucesso!');
    this.clearForm();
    this.carregarClientes();
  } catch (error) {
    console.error('Erro ao alterar cliente: ', error);
    alert('Erro ao alterar cliente. Verifique os detalhes no console.');
  }
},
    
async excluirCliente() {
  // Verifica se o campo de busca por CPF está preenchido
  if (this.cpfBusca.trim() === '') {
    alert('Por favor, preencha o CPF do cliente.');
    return;
  }

  // Confirma se o usuário deseja excluir o cliente
  if (!confirm('Tem certeza que deseja excluir este cliente?')) {
    return; // Se não confirmar, sai da função
  }

  try {
    // Busca o cliente pelo CPF digitado
    const clienteEncontrado = this.clientes.find(cliente => cliente.cpf === this.cpfBusca.trim());

    // Verifica se o cliente foi encontrado
    if (!clienteEncontrado) {
      alert('Cliente não encontrado.');
      return;
    }

    const clienteId = clienteEncontrado.id;  // Obtém o ID do cliente encontrado

    // Faz a requisição de exclusão utilizando o ID do cliente na URL
    const response = await fetch(`http://localhost:5500/clientes/${clienteId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir cliente');
    }

    alert('Cliente excluído com sucesso!');
    this.clearForm();  // Limpa o formulário
    this.carregarClientes();  // Atualiza a lista de clientes
  } catch (error) {
    console.error('Erro ao excluir cliente: ', error);
    alert('Erro ao excluir cliente. Verifique os detalhes no console.');
  }
},

    // Método para limpar o formulário após o cadastro ou edição
    clearForm() {
      this.cliente = {
        id: '',
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        telefone: '',
        endereco: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        numero: ''
      };
      this.isEditing = false;
      this.errors = {};
    }
  }
};
</script>

<style>
/* Contêiner principal */
.cadastro-container {
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
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
  margin-bottom: 20px;
  text-transform: uppercase;
}

/* Form Row */
.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

/* Full width */
.full-width {
  width: 100%;
}

/* Half width */
.half-width {
  width: 48%;
}

/* Grupos de formulário */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #444;
  margin-bottom: 5px;
  font-size: 14px;
  text-transform: uppercase;
}

.form-group input {
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  background-color: #fff;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #007bff;
}

/* Exibição de mensagens de erro */
.error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

/* Botões */
.submit-button, .edit-button, .delete-button, .cancel-button {
  padding: 12px 20px;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 10px;
}

.submit-button {
  background-color: #007bff;
}

.edit-button {
  background-color: #3498db;
}

.delete-button {
  background-color: #e74c3c;
}

.cancel-button {
  background-color: #95a5a6;
}

.submit-button:hover {
  background-color: #0056b3;
}

.edit-button:hover {
  background-color: #2980b9;
}

.delete-button:hover {
  background-color: #c0392b;
}

.cancel-button:hover {
  background-color: #7f8c8d;
}
</style>
