<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div
      v-if="!filmStore.searchQuery && randomMovieOnPage"
      class="text-center mt-4 transition-transform transform hover:scale-105"
  >
    <div class="bg-white hover:bg-gray-50 p-4 rounded-lg shadow-md border border-gray-300 max-w-md mx-auto transition duration-300 ease-in-out hover:shadow-lg">
      <p class="text-gray-700 text-lg font-medium">
        Сайт Movie in Che рекомендует к просмотру фильм:
        <router-link
            :to="{ name: 'film-detail', params: { id: randomMovieOnPage.kp_id || randomMovieOnPage.kinopoisk_id } }"
            class="italic text-green-600 hover:underline"
        >
          "{{ randomMovieOnPage.ru_title ? randomMovieOnPage.ru_title : randomMovieOnPage.orig_title }}"
        </router-link>
      </p>
    </div>
  </div>



  <section class="bg-white py-8">
    <div v-if="films && films.length && !loading" class="container mx-auto flex flex-wrap pt-4 pb-12">
      <FilmCard
          v-for="film in films"
          :key="film.id"
          :product="film"
          :kinopoisk-id="film.kinopoisk_id ? film.kinopoisk_id : film.kp_id"
          class="w-full md:w-1/3 lg:w-1/4 p-4"
      />
    </div>
    <div v-else-if="!loading">
      <p>Фильмы не найдены или произошла ошибка</p>
    </div>
  </section>

  <div v-if="!loading && films && films.length > 0" class="flex justify-center mt-8 mb-8">
    <button @click="prevPage" :disabled="currentPage === 1"
            class="bg-blue-500 text-white py-1 px-3 rounded-md transition-transform duration-200 ease-in-out hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 text-sm">
      <span class="arrow">←</span> Назад
    </button>
    <span class="mx-4">Страница {{ currentPage }} из {{ totalPages }}</span>
    <button @click="nextPage" :disabled="!hasMoreFilms"
            class="bg-blue-500 text-white py-1 px-3 rounded-md transition-transform duration-200 ease-in-out hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 text-sm">
      Вперед <span class="arrow">→</span>
    </button>
  </div>

</template>

<script>
import FilmCard from "@/components/fillm/FilmCard.vue";
import Loader from "@/components/loader/Loader.vue";
import { useFilmStore } from "@/stores/filmStore";

export default {
  name: "MainPage",
  components: { Loader, FilmCard },
  setup() {
    const filmStore = useFilmStore();
    return {filmStore};
  },
  computed: {
    films() {
      return this.filmStore.films || [];
    },
    loading() {
      return this.filmStore.loading;
    },
    totalPages() {
      return this.filmStore.totalPages;
    },
    currentPage() {
      return this.filmStore.currentPage;
    },
    hasMoreFilms() {
      return this.filmStore.hasMoreFilms;
    },

    randomMovieOnPage() {
      return this.filmStore.randomMovieOnPage;
    }
  },
  watch: {
    '$route.query.page': {
      immediate: true,
      handler(newPage) {
        const page = parseInt(newPage, 10) || 1;
        this.getFilms(page);
      }
    }
  },
  methods: {
    async getFilms(page = 1) {
      const filmStore = useFilmStore();
      filmStore.loading = true;
      try {
        if (filmStore.searchQuery) {
          filmStore.getFilmsByPageWithQuery();
        } else {
          await filmStore.fetchFilms(page);
        }
      } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error);
      } finally {
        filmStore.loading = false;
      }
    },
    nextPage() {
      this.filmStore.nextPage();
      this.updateRouteQuery(this.filmStore.currentPage);
    },
    prevPage() {
      this.filmStore.prevPage();
      this.updateRouteQuery(this.filmStore.currentPage);
    },
    updateRouteQuery(page) {
      this.$router.push({query: {...this.$route.query, page: String(page)}});
    }
  }
};
</script>
