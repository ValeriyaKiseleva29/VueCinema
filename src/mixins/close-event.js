// Дз 7 базовый миксин

export default {
    methods: {
        closeModal() {
            this.$emit("close");
        },

        checkUser() {
            this.$emit("check-user");
        }
    }
}