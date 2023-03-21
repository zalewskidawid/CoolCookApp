// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home';
import Contact from '@/components/Contact';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import Recipes from '@/components/Recipes';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/Recipes',
    component: Recipes,
  },
  {
    path: '/Login',
    component: LoginForm,
  },
  {
    path: '/Contact',
    component: Contact,
  },
  {
    path: '/Register',
    component: RegisterForm,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
