// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomePage';
import Contact from '@/pages/ContactPage';
import LoginForm from '@/pages/LoginPage';
import RegisterForm from '@/pages/RegisterPage';
import Recipes from '@/pages/RecipesPage';

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
  linkActiveClass: "active-link",
  routes,
})

export default router
