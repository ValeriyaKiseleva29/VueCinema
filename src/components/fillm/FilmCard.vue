<template>
  <div
      v-if="(typeof product.kp_id === 'number' || typeof product.kinopoisk_id === 'number') && (product.kp_id || product.kinopoisk_id)"
      class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col transform transition-transform hover:scale-105"
  >
    <router-link :to="{ name: 'film-detail', params: { id: product.kp_id || product.kinopoisk_id } }">
      <div class="pt-3 flex flex-col items-center justify-between relative hover:shadow-2xl transition-shadow duration-300">
        <img :src="imgUrl" alt="Product Image" class="w-full h-auto">
        <div class="font-bold text-lg hover:underline text-center" title="Смотреть онлайн">
          {{ product.ru_title ? product.ru_title : product.title }}
        </div>
        <div class="font-bold text-lg hover:underline text-center">
          {{ product.orig_title }}
        </div>
      </div>
    </router-link>
  </div>


</template>

<script>
import {getImageUrl} from "@/services/api.js";

export default {
  name: 'FilmCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
    kinopoiskId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      imgUrl: "",
    };
  },
  mounted() {
    this.getImgUrl();
  },
  methods: {
    async getImgUrl() {
      try {
        const data = await getImageUrl(this.product.kp_id ? this.product.kp_id : this.product.kinopoisk_id);
        this.imgUrl = data.posterUrl;

      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
      }
    },
  },
};
</script>
