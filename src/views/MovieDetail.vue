<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-if="!loading && movie" class="movie-details-wrapper" v-hover-style>
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-center text-xl font-bold mt-2" v-text-color="'green'">
        {{ movie.title ? movie.title : movie.orig_title }} ({{ movie.orig_title }})
      </h1>

      <p class="text-center text-gray-600" v-text-color="'blue'"><strong>Год:</strong> {{ movie.year }}</p>
      <div class="flex justify-center mt-3" v-html="movie.iframe"></div>
    </div>
  </div>
  <div v-if="!loading && movie && isLoggedIn" class="flex justify-center w-full mt-4 mb-5" v-drag>
    <button
        v-if="!isFavorite"
        @click="addToFavorites"
        class="bg-blue-500 text-white py-1 px-3 rounded-md transition-transform duration-200 ease-in-out hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 text-sm"
    >
      Добавить в избранное
    </button>
    <button
        v-if="isFavorite"
        @click="dropFromFavorites(movie.kp_id ? movie.kp_id : movie.kinopoisk_id)"
        class="bg-red-500 text-white py-1 px-3 rounded-md transition-transform duration-200 ease-in-out hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 text-sm"
    >
      Удалить из избранного
    </button>
  </div>
</template>

<script>
import Loader from "@/components/loader/Loader.vue";
import { getImageUrl, getOneFilm } from "@/services/api.js";
import { useUserStore } from "@/stores/userStore.js";
import {addDoc, collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import db from "@/main.js";
// дз 6 номер 3 - Доступ к данным о фильме из filmStore
export default {
  components: { Loader },
  data() {
    return {
      movie: null,
      loading: false,
      imgUrl: "",
      favorites: [],
      user: null,
    };
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  async mounted() {
    await this.setLoginUser()
        .then(() => {
          this.fetchMovieDetails();
          this.getImgUrl();
          this.getFavorites();
        });
  },
  computed: {
    isFavorite() {
      return this.favorites.includes(Number(this.$route.params.id));
    },
    isLoggedIn() {
      return this.user != null;
    }
  },
  methods: {
    async setLoginUser() {
      const userStore = useUserStore();
      this.user = userStore.initAuthUser();
      console.log(this.user);
    },
    async getImgUrl() {
      try {
        const data = await getImageUrl(this.$route.params.id);
        this.imgUrl = data.posterUrl;
      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
      }
    },
    async getFavorites() {
      // const userStore = useUserStore();
      // const uid = userStore.getUserUid();
      console.log(this.user);
      this.favorites = [];
      this.loading = true;
      const q = query(collection(db, 'favorites'), where('user_id', '==', this.user.uid))
      const querySnap = await getDocs(q);

      querySnap.forEach((doc) => {
        this.favorites.push(doc.data().kinopoisk_id)
      });
      this.loading = false;
    },
    async fetchMovieDetails() {
      this.loading = true;
      const movieId = this.$route.params.id;
      try {
        const data = await getOneFilm(movieId);
        if (data) {
          this.movie = data[0];
          console.log('Movie data:', this.movie);
          this.loading = false;
        } else {
          console.error("Не удалось загрузить данные о фильме.");
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных о фильме:", error);
      }
    },
    async addToFavorites() {
      const userStore = useUserStore();
      const uid = userStore.getUserUid()
      const colRef = collection(db, 'favorites')
      const dataObj = {
        kinopoisk_id: this.movie.kp_id ? this.movie.kp_id : this.movie.kinopoisk_id,
        user_id: uid,
        img_url: this.imgUrl,
        title: this.movie.ru_title ? this.movie.ru_title : this.movie.title,
      }

      await addDoc(colRef, dataObj)
      await this.getFavorites();
    },
    async dropFromFavorites(id) {
      // const userStore = useUserStore();
      // const uid = userStore.getUserUid();
      const favorites = query(collection(db, 'favorites'), where('kinopoisk_id', '==', id), where('user_id', '==', this.user.uid))
      const querySnap = await getDocs(favorites);
      querySnap.forEach((item) => {
        deleteDoc(doc(db, 'favorites', item.id))
      });

      await this.getFavorites();
    }
  },
};
</script>