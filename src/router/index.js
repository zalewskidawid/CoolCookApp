// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomePage';
import Contact from '@/pages/ContactPage';
import LoginForm from '@/pages/LoginPage';
import RegisterForm from '@/pages/RegisterPage';
import Recipes from '@/pages/RecipesPage';
import AboutMe from '@/pages/AboutMe';

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
    path: '/Contact/DawidWymoczylo',
    component: AboutMe,
    props: {
      name: 'Dawid Wymoczyło',
      photoUrl: '../src/assets/about_me-avatars/aboutme_placeholder.png'
    }
  },
  {
    path: '/Contact/DawidZalewski',
    component: AboutMe,
    props: {
      name: 'Dawid Zalewski',
      photoUrl: '../src/assets/about_me-avatars/aboutme_placeholder.png'
  }
},
{
    path: '/Contact/MichalWnorowski',
    component: AboutMe,     
    props: {
      name: 'Michał Wnorowski',
      photoUrl: '../src/assets/about_me-avatars/aboutme_placeholder.png'
  }
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
