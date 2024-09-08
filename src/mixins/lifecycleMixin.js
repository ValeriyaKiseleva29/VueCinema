// дз 7 миксин для жизненных циклов
export const lifecycleMixin = {
    created() {
        console.log(`Компонент был создан!`);
    },
    destroyed() {
        console.log(`Компонент был уничтожен!`);
    }
};
