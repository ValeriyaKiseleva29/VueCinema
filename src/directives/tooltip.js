// директива для тултипа - дз 7

export default {
    beforeMount(el, binding) {
        const tooltip = document.createElement('div');
        tooltip.textContent = binding.value;


        tooltip.classList.add(
            'absolute',
            'bg-gray-700',
            'text-white',
            'text-sm',
            'px-2',
            'py-1',
            'rounded',
            'shadow-lg',
            'opacity-0',
            'transition-opacity',
            'whitespace-nowrap',
            'z-50'
        );

        el.appendChild(tooltip);

        el.addEventListener('mouseenter', () => {
            tooltip.classList.replace('opacity-0', 'opacity-100');
        });

        el.addEventListener('mouseleave', () => {
            tooltip.classList.replace('opacity-100', 'opacity-0');
        });

        el.addEventListener('mousemove', (event) => {
            tooltip.style.top = `${event.clientY + 10}px`;
            tooltip.style.left = `${event.clientX + 10}px`;
        });
    },
};
