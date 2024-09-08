<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style="z-index: 1000;">
    <div class="bg-white p-8 rounded-lg max-w-md w-full relative">
      <h2 class="text-xl font-bold mb-4">Вы действительно хотите выйти?</h2>
          <button type="button" @click="$emit('accept-logout')" class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-105">
            Выйти
          </button>
          <button type="button" @click="closeModal" class="ml-4 text-gray-500 hover:text-gray-700">
            Остаться
          </button>
        </div>
  </div>
</template>

<script>
import closeEvent from "@/mixins/close-event.js";

export default {
  name: "LogoutModal",
  mixins: [closeEvent],
};
</script>

<style scoped>

</style>
