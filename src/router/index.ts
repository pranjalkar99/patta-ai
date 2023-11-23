import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Example from '../components/Example.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: Example,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: () => import('../views/HomePage.vue'),
      },
      {
        path: 'developer',
        component: () => import('../views/RadioPage.vue'),
      },
      {
        path: 'dataset',
        component: () => import('../views/DetailsPage.vue'),
      },
      {
        path: 'plant',
        name:'plant',
        component: () => import('../views/PlantDetailsPage.vue'),
      }
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

export default router;