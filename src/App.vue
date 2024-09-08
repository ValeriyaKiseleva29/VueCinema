<template>
  <div>
    <header>
      <Navbar
          :user="user"
      />
    </header>
    <main>
      <Carousel />
      <RouterView />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
  <widget-container-modal />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Carousel from '@/components/Carousel.vue';
import ProductCard from '@/components/fillm/FilmCard.vue';
import Footer from '@/components/Footer.vue';
import MainPage from "@/views/MainPage.vue";
import { container } from "jenesius-vue-modal";

export default {
  name: 'App',
  components: {
    MainPage,
    Navbar,
    Carousel,
    ProductCard,
    Footer,
    WidgetContainerModal: container ,
  },
  data() {
    return {
      isRegisterModalOpen: false,
      isLoginModalOpen: false,
      isLogoutModalOpen: false,
      user: null,
      products: []
    };
  },
};
</script>
