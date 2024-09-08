<template>
  <nav id="header" class="w-full z-30 top-0 py-1">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">

      <label for="menu-toggle" class="cursor-pointer md:hidden block">
        <svg class="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input class="hidden" type="checkbox" id="menu-toggle" />
      <div class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
        <div>
          <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            <li v-if="!user" class="order-2 md:order-3 flex items-center" id="nav-content">
              <a href="#" @click.prevent="getModal('register')" class="inline-block no-underline hover:text-black hover:underline py-2 px-4">
                Регистрация
              </a>
            </li>
            <li>
              <router-link v-if="$route.name !== 'film-favorites'"
                           :to="{ name: 'film-favorites' }"
                           class="inline-block no-underline hover:text-black hover:underline py-2 px-4">
                Избранное
              </router-link>
              <router-link v-else :to="{ name: 'main' }" class="inline-block no-underline hover:text-black hover:underline py-2 px-4">
                Главная
              </router-link>

            </li>
          </ul>
        </div>
      </div>


      <div class="order-1 md:order-2 mx-auto">
        <router-link
            @click.native="resetSearchAndReload"
            :to="{name: 'main'}"
            class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl justify-center"
            href="#"
            v-tooltip="'Перейти на главную страницу'"
        >
        <svg class="fill-current text-gray-800 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M2,4v16h20V4H2z M4,18H3v-2h1V18z M4,14H3v-2h1V14z M4,10H3V8h1V10z M4,6H3V4h1V6z M16,6h-8V4h8V6z M20,18h-1v-2h1V18z
              M20,14h-1v-2h1V14z M20,10h-1V8h1V10z M20,6h-1V4h1V6z M18,18H6V8h12V18z"/>
        </svg>
        Movie in Che
        </router-link>
      </div>

      <template v-if="!isInRestrictedRoute">
        <div class="relative order-3 md:order-3 flex items-center w-full md:w-auto ml-0">
          <input @keyup.enter="performSearch"  type="text" v-model="searchQuery" placeholder="Поиск фильмов..." class="w-full md:w-64 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black" />
          <button v-if="searchQuery" @click="clearSearch" class="absolute right-0 mr-1 text-gray-500 hover:text-gray-700 focus:outline-none">&times;</button>
        </div>

        <div class="order-3 md:order-3 ml-4">
          <button @click="performSearch" class="bg-black text-white px-4 py-2 rounded-full">Искать</button>
        </div>
      </template>


      <div class="order-4 md:order-4 flex items-center ml-auto" id="nav-content">
        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <circle fill="none" cx="12" cy="7" r="3" />
          <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
        </svg>
        <a v-if="!user" @click.prevent="getModal('login')" class="inline-block no-underline hover:text-black hover:underline" href="#">Войти</a>
        <a v-if="user" @click.prevent="getModal('logout')" class="inline-block no-underline hover:text-black hover:underline" href="#">Выйти</a>
      </div>
    </div>
  </nav>
</template>

<script>
import modal from "@/mixins/modal.js";
import { useFilmStore } from "@/stores/filmStore.js";

export default {
  name: 'Navbar',
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    isInRestrictedRoute() {
      return this.$route.name === "film-favorites" || this.$route.name === "film-detail";
    },
  },
  methods: {
    clearSearch() {
      this.searchQuery = '';
    },

    performSearch() {
      if (this.searchQuery.trim()) {
        const filmStore = useFilmStore();
        filmStore.searchQuery = this.searchQuery;
        filmStore.searchFilms();
      }
    },

    resetSearchAndReload() {
      const filmStore = useFilmStore();


      this.clearSearch();


      filmStore.resetState();

      this.$router.push({ name: 'main' }).then(() => {
        this.$router.go(0);
      });
    },
  },
  mixins: [modal],
  mounted() {
    this.checkUser();
  }
};
</script>
