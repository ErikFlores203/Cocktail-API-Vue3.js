import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '@/views/InicioView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: InicioView
    },
    {
      path: '/favoritos',
      name: 'Favoritos',
      component: () => import('@/views/FavoritosView.vue')
    }
    
  ]
})

export default router
