// дз 7 создание глобального миксина
export const globalMixin = {
    created() {
        console.log(`Глобальный миксин: компонент ${this.$options.name} был создан`);
    },
    methods: {
        globalMethod() {
            console.log("Это метод из глобального миксина");
        }
    }
};
