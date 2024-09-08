<template>
  <login-modal ref="loginModal" @check-user="checkUser">
    <template v-slot:header>
      <h2>Войти на сайт:</h2>
    </template>
    <template v-slot:footer>
      <button type="submit" @click="submitLogin" class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-105">
        Войти сейчас
      </button>
      <button type="button" @click="resetForm" class="ml-4 text-gray-500 hover:text-gray-700">
      Отмена
      </button>
    </template>
  </login-modal>
</template>

<script>
import LoginModal from './LoginModal.vue';
import closeEvent from "@/mixins/close-event.js";

export default {
  components: {
    LoginModal
  },
  mixins: [closeEvent],
  methods: {
    submitLogin() {
      this.$refs.loginModal.handleSubmit();
    },
    resetForm() {
      this.$refs.loginModal.handleCancel();
    }
  }
};
</script>