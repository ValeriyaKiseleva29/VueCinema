<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style="z-index: 1000;">
    <div class="bg-white p-8 rounded-lg max-w-md w-full relative">
      <!-- Дз 7 - базовый слот -->
      <slot>
        <p>Привет, войдите на сайт!</p> <!-- Базовый слот с фолбек контентом -->
      </slot>

      <!-- Дз 7 - слот для header -->
      <slot name="header">
        <!-- Дз 7 - слот с Фолбек Контентом -->
        <h2 class="text-xl font-bold mb-4">Вход на сайт</h2>
      </slot>

      <!-- Дз 7 - именованный слот для body -->
      <slot name="body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input v-model="email" type="text" class="border w-full p-2 mt-2 rounded" />
            <p v-if="submitted && emailError" class="text-red-500">{{ emailError }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Пароль</label>
            <input v-model="password" type="password" class="border w-full p-2 mt-2 rounded" />
            <p v-if="submitted && passwordError" class="text-red-500">{{ passwordError }}</p>
          </div>
        </form>
      </slot>

      <!-- Дз 7 - слот для footer -->
      <slot name="footer">
        <div class="flex items-center justify-between">
          <button type="submit" @click="handleSubmit" class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-105">
            Войти
          </button>
          <button type="button" @click="handleCancel" class="ml-4 text-gray-500 hover:text-gray-700">
            Отмена
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useUserStore } from "@/stores/userStore.js";
import closeEvent from "@/mixins/close-event.js";
import { lifecycleMixin } from "@/mixins/lifecycleMixin.js";
import { validationMixin } from "@/mixins/validationMixin.js";

export default {
  name: "SlottedLoginModal",
  mixins: [closeEvent, lifecycleMixin, validationMixin],
  methods: {
    handleCancel() {
      this.resetForm();
      this.closeModal();
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.emailError = "";
      this.passwordError = "";
      this.submitted = false;
    },
    handleSubmit() {
      this.submitted = true;
      if (this.validateFields()) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              const userStore = useUserStore();
              const user = userCredential.user;
              userStore.setAuthUser(user);
              this.resetForm();
              this.closeModal();
              this.checkUser();
            })
            .catch((error) => {
              alert(error.message);
            });
      }
    }
  }
};
</script>
