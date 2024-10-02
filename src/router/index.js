import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/HomePage.vue'
import Basket from '../components/ShoppingBasket.vue'
import Products from '../components/Products.vue'

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
    path: '/products',
    name: 'Products',
    component: Products
    },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
