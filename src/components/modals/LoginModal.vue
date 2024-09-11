<template>
  <SlottedLoginModal>
    <!-- Дз 7 - слот для header -->
    <template v-slot:header>
      <h2 class="text-xl font-bold mb-4">Авторизация</h2> <!-- Контент для slot header -->
    </template>

    <!-- Дз 7 - слот для body -->
    <template v-slot:body>
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
    </template>

    <!-- Дз 7 - слот для footer -->
    <template v-slot:footer>
      <div class="flex items-center justify-between">
        <button type="submit" @click="handleSubmit" class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-105">
          Войти
        </button>
        <button type="button" @click="handleCancel" class="ml-4 text-gray-500 hover:text-gray-700">
          Отмена
        </button>
      </div>
    </template>
  </SlottedLoginModal>
</template>

<script>
import SlottedLoginModal from './SlottedLoginModal.vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useUserStore } from "@/stores/userStore.js";
import closeEvent from "@/mixins/close-event.js";
import { lifecycleMixin } from "@/mixins/lifecycleMixin.js";
import { validationMixin } from "@/mixins/validationMixin.js";

export default {
  name: "LoginModal",
  components: {
    SlottedLoginModal
  },
  mixins: [closeEvent, lifecycleMixin, validationMixin],
  data() {
    return {
      email: '',
      password: '',
      submitted: false,
      emailError: '',
      passwordError: ''
    };
  },
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
