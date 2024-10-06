import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Basket from '../components/Basket.vue'
import Product from '../components/Product.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
    },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
