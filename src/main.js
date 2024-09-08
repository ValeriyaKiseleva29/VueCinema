import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireFirestoreOptionsAPI } from "vuefire";
import { initializeApp } from "firebase/app";
import App from './App.vue'
import router from './router'
import './index.css'
import { getFirestore } from "firebase/firestore";
import drag from "@/directives/drag.js";
import tooltip from "@/directives/tooltip.js";
import hoverStyle from "@/directives/hover-style.js";
import textColor from "@/directives/text-color.js";
import { globalMixin } from '@/mixins/globalMixin.js';

const app = createApp(App)

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY ?? "AIzaSyBtwNLQ2wEjb2WTo4lKAzlAgh-QW2O7mXE",
    authDomain: import.meta.env.VITE_AUTH_DOMAIN ?? "leargning-app.firebaseapp.com",
    projectId: import.meta.env.VITE_PROJECT_ID ??"leargning-app",
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET ?? "leargning-app.appspot.com",
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID ?? "50623800726",
    appId: import.meta.env.VITE_APP_ID ?? "1:50623800726:web:ab52f8f99069f9847b69b7"
};
const firebaseApp = initializeApp(firebaseConfig);

app.use(VueFire, {
    firebaseApp,
    modules: [VueFireFirestoreOptionsAPI()],
});

// дз 6 номер 1 - настроена Pinia как стор
// дз 7 - все директивы зарегистрированны глобально
app.use(createPinia());
app.use(router);
app.directive('drag', drag);
app.directive('tooltip', tooltip);
app.directive('hover-style', hoverStyle);
app.directive('text-color', textColor);
app.mixin(globalMixin);
app.mount('#app');

const db = getFirestore()
export default db