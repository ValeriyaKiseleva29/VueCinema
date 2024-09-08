<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style="z-index: 1000;">
    <div class="bg-white p-8 rounded-lg max-w-md w-full relative">
      <h2 class="text-xl font-bold mb-4">Регистрация нового пользователя</h2>
      <form @submit.prevent="handleSubmit">
        <div v-if="firebaseError" class="mb-4">
          <p class="text-red-500">{{ firebaseError }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input v-model="email" type="email" class="border w-full p-2 mt-2 rounded"/>
          <p v-if="submitted && emailError" class="text-red-500">{{ emailError }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Пароль</label>
          <input v-model="password" type="password" class="border w-full p-2 mt-2 rounded"/>
          <p v-if="submitted && passwordError" class="text-red-500">{{ passwordError }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Повторите пароль</label>
          <input v-model="confirmPassword" type="password" class="border w-full p-2 mt-2 rounded"/>
          <p v-if="submitted && confirmPasswordError" class="text-red-500">{{ confirmPasswordError }}</p>
        </div>
        <div class="mb-4 text-center">
          <p class="text-gray-700">Если уже зарегистрированы, нажмите
            <a href="#" @click.prevent="$emit('change-to-login')" class="text-blue-500 underline hover:text-blue-700"> Войти</a>
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-105">
            Зарегистрироваться
          </button>
          <button type="button" @click="handleCancel" class="ml-4 text-gray-500 hover:text-gray-700">
            Отмена
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useUserStore } from "@/stores/userStore.js";
import closeEvent from "@/mixins/close-event.js";

export default {
  name: "RegisterModal",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      firebaseError: "",
      submitted: false,
    };
  },
  mixins: [closeEvent],
  methods: {
    handleCancel() {
      this.resetForm();
      this.closeModal();
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.emailError = "";
      this.passwordError = "";
      this.confirmPasswordError = "";
      this.firebaseError = "";
      this.submitted = false;
    },
    validateFields() {
      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.match(emailRegex)) {
        this.emailError = "Введите корректный email адрес.";
        isValid = false;
      } else {
        this.emailError = "";
      }
      if (this.password.length < 5) {
        this.passwordError = "Пароль должен содержать минимум 5 символов.";
        isValid = false;
      } else {
        this.passwordError = "";
      }
      if (this.password !== this.confirmPassword) {
        this.confirmPasswordError = "Пароли не совпадают.";
        isValid = false;
      } else {
        this.confirmPasswordError = "";
      }

      return isValid;
    },
    handleSubmit() {
      this.submitted = true;
      this.firebaseError = "";
      if (this.validateFields()) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              const userStore = useUserStore();
              const user = userCredential.user;
              userStore.setAuthUser(user);
              this.submitted = true;
              this.resetForm();
              this.closeModal();
              this.checkUser();
            })
            .catch((error) => {

              if (error.code === 'auth/email-already-in-use') {
                this.firebaseError = "Этот email уже используется.";
              } else if (error.code === 'auth/weak-password') {
                this.firebaseError = "Пароль слишком слабый.";
              } else {
                this.firebaseError = "Произошла ошибка при регистрации.";
              }
            });
      }
    },
  },
};
</script>
