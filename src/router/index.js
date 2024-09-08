import { createRouter, createWebHistory } from 'vue-router'
import MovieDetail from "@/views/MovieDetail.vue";
import MainPage from "@/views/MainPage.vue";
import FavoritesPage from "@/views/FavoritesPage.vue";
import { useUserStore } from '@/stores/userStore';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
    props: true
  },
  {
    path: '/movie/:id',
    name: 'film-detail',
    component: MovieDetail,
    props: true
  },
  {
    path: '/movie/favorites',
    name: 'film-favorites',
    component: FavoritesPage,
    props: true,
    meta: { requiresAuth: true } // дз 6 номер 11
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.user) {
    next({ name: 'main' });
  } else {
    next();
  }
});

export default router;
