import { openModal, pushModal } from "jenesius-vue-modal";
import RegisterModal from "@/components/modals/RegisterModal.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
import LogoutModal from "@/components/modals/LogoutModal.vue";
import { useUserStore } from "@/stores/userStore.js";
import SlottedLoginModal from "@/components/modals/SlottedLoginModal.vue";

export default {
    data() {
        return {
            component: null,
            user: null,
        }
    },
    methods: {
        async getModal(component) {
            this.setComponent(component);
            const modal = await openModal(this.component);
            modal.on("close", () => {
                modal.close();
            });
            modal.on("change-to-login", async () => {
                await modal.close();
                const newModal = await openModal(SlottedLoginModal);
                newModal.on("close", () => {
                    newModal.close();
                });
                newModal.on("check-user", () => {
                    this.checkUser();
                });
            });

            modal.on("accept-logout", () => {
                // дз 6 номер 6 комбинируются несколько stores
                useUserStore().removeUser();
                this.user = null;
                this.checkUser();
                modal.close();
            });

            modal.on("check-user", () => {
                this.checkUser();
            });
            return modal;
        },
        setComponent(string) {
            switch (string) {
                case "register":
                    this.component = RegisterModal;
                    break;
                case "login":
                    this.component = LoginModal;
                    break;
                case "logout":
                    this.component = LogoutModal;
                    break;
            }
        },
        checkUser() {
            // дз 6 номер 3 - Вивели данные из свого store в компонент Vue.
            const userStore = useUserStore();
            this.user = userStore.initAuthUser();
        },
    }
}