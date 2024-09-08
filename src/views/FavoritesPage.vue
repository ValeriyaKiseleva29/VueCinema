<template>
  <Loader v-if="loading"/>

  <div v-else class="p-4">
    <h2 class="flex justify-center text-xl font-bold mb-4">Избранное</h2>
    <div v-if="favorites.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="film in favorites" :key="film.kinopoisk_id" class="bg-white shadow rounded-lg p-4 flex flex-col items-center">
        <router-link :to="{ name: 'film-detail', params: { id: film.kinopoisk_id } }" class="hover:underline">
          <img :src="film.img_url" alt="poster" class="w-24 h-32 mb-2">
          <span class="text-center">{{ film.title }}</span>
        </router-link>
        <button @click="dropFromFavorites(film.kinopoisk_id)" class="text-red-600 hover:underline mt-2">Удалить</button>
      </div>
    </div>
    <div v-else>
      <p>Ваш список избранного пуст.</p>
    </div>
  </div>
</template>


<script setup>
import {collection, where, query, doc, getDocs, deleteDoc} from "firebase/firestore"
import db from '@/main.js'
import Loader from "@/components/loader/Loader.vue";
import { useUserStore } from "@/stores/userStore.js";
import { ref, onMounted } from "vue";
const favorites = ref([]);
const loading = ref(false);


const getFavorites = async () => {
  const userStore = useUserStore();
  const uid = userStore.getUserUid();
  favorites.value = [];
  loading.value = true;
  const q = query(collection(db, 'favorites'), where('user_id', '==', uid))
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    favorites.value.push(doc.data())
  });

  loading.value = false;
};

onMounted(async () => {
  await getFavorites();
});

const dropFromFavorites = async (id) => {
  const userStore = useUserStore();
  const uid = userStore.getUserUid();
  const favorites = query(collection(db, 'favorites'), where('kinopoisk_id', '==', id), where('user_id', '==', uid))
  const querySnap = await getDocs(favorites);
  querySnap.forEach((item) => {
    deleteDoc(doc(db, 'favorites', item.id))
  });

  await getFavorites();
}
</script>
