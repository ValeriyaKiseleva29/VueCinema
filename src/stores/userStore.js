import { defineStore } from "pinia";
// дз 6 номер 2 - это хранилище используется для пользователя
// дз 6 номер 8- модуль
export const useUserStore = defineStore({
    id: "userStore",
    state: () => {
        return {
            user: null,
        };
    },
    actions: {
        setAuthUser(user) {
            this.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        initAuthUser() {
            const storedUser = localStorage.getItem("user");
            if (storedUser != null) {
                try {
                    this.user = JSON.parse(storedUser);
                } catch {
                    this.user = null;
                }
            }
            return this.user;
        },
        getUserUid() {
            return this.user ? this.user.uid : null;
        },
        removeUser() {
            this.user = null;
            localStorage.removeItem("user");
        },
    },
});
