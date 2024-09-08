// директива для перетаскивания  дз 7
export default {
    beforeMount(el) {
        el.style.position = 'absolute';
        el.style.cursor = 'move';

        let offsetX = 0, offsetY = 0;

        const handleMouseDown = (event) => {
            offsetX = event.clientX - el.offsetLeft;
            offsetY = event.clientY - el.offsetTop;

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (event) => {
            const left = event.clientX - offsetX;
            const top = event.clientY - offsetY;

            el.style.left = `${left}px`;
            el.style.top = `${top}px`;
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        el.addEventListener('mousedown', handleMouseDown);

        el.__handleMouseDown__ = handleMouseDown;
    },
    unmounted(el) {
        el.removeEventListener('mousedown', el.__handleMouseDown__);
        delete el.__handleMouseDown__;
    }
};
