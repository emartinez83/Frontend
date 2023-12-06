// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/proyectos', // Cambia '/proyectos' por la URL que desees
        name: 'Proyectos', // Nombre de la ruta
        component: () => import('@/views/Proyectos.vue'), // Componente de la vista de proyectos
      },
      {
        path: '/donadores', // Cambia '/proyectos' por la URL que desees
        name: 'Donadores', // Nombre de la ruta
        component: () => import('@/views/Donadores.vue'), // Componente de la vista de proyectos
      },
      {
        path: '/donatarios', // Cambia '/proyectos' por la URL que desees
        name: 'Donatarios', // Nombre de la ruta
        component: () => import('@/views/Donatorios.vue'), // Componente de la vista de proyectos
      },
      {
        path: '/', // Cambia '/proyectos' por la URL que desees
        name: 'Default', // Nombre de la ruta
        component: () => import('@/views/Login.vue'), // Componente de la vista de proyectos
      },
      {
        path: '/login', // Cambia '/proyectos' por la URL que desees
        name: 'IniciarSesion', // Nombre de la ruta
        component: () => import('@/views/Login.vue'), // Componente de la vista de proyectos
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
