import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VistaCatalogo from '../views/VistaCatalogo.vue'
import PerfilProveedor from '../views/PerfilProveedor.vue'
import LogIn from '../components/login.vue'
import SignUp from '../components/signup.vue'
import Carrito from '../views/carritoCompras.vue'
import ServiciosPrestados from '../views/ServiciosPrestados.vue'
import ServiciosPedidos from '../views/serviciosPedidos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/catalogo',
    name: 'VistaCatalogo',
    component: VistaCatalogo
  },
  {
    path: '/perfilProveedor',
    name: 'perfilProveedor',
    component: PerfilProveedor
  },
  {
    path: '/user/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/user/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: Carrito
  },
  {
    path: '/serviciosPrestados',
    name: 'ServiciosPrestados',
    component: ServiciosPrestados
  },
  {
    path: '/serviciosPedidos',
    name: 'ServiciosPedidos',
    component: ServiciosPedidos
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
