// дз 7 директива для смены цвета

export default {
    beforeMount(el, binding) {
        el.style.color = binding.value || 'black';
    }
};
