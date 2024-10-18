import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Carrinho from '../components/Carrinho.vue'
import Product from '../components/Product.vue'
import Login from '../components/Login.vue'
import CadastroCliente from '../components/CadastroCliente.vue'
import CadastroProduto from '../components/CadastroProduto.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/carrinho',
    name: 'Carrinho',
    component: Carrinho
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
    },
    {
      path: '/cadastroproduto',
      name: 'CadastroProduto',
      component: CadastroProduto
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
        },
        {
          path: '/cadastrocliente',
          name: 'CadastroCliente',
          component: CadastroCliente
          },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
