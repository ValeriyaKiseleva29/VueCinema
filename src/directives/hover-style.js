// дз 7 директива которая принимает параметр и выполняет разные действия в зависимости от значения

export default {
    beforeMount(el) {
        el.style.transition = 'transform 0.3s, box-shadow 0.3s';

        el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.05)';
            el.style.boxShadow = '0 15px 30px rgba(0, 128, 0, 0.5)';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
            el.style.boxShadow = '0 8px 16px rgba(0, 128, 0, 0.2)';
        });
    }
};
