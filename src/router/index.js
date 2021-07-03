import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "favorites" */ '../views/Favorites.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  },
  {
    path: '/checkout/:userData',
    props: true,
    name: 'Checkout',
    component: () => import(/* webpackChunkName: "checkout" */ '../views/Checkout.vue')
  },
  {
    path: '/checkout/:userData/payment',
    props: true,
    name: 'Payment',
    component: () => import(/* webpackChunkName: "payment" */ '../views/Payment.vue')
  },
  {
    path: '/checkout/:userData/payment/continue',
    props: true,
    name: 'Continue',
    component: () => import(/* webpackChunkName: "continue" */ '../views/Continue.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
