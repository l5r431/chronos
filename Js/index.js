document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu');
    const menu = document.querySelector('.menu');
    const navbar = document.querySelector('.navbar-mobile');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('change', () => {
            navbar.classList.toggle('active', menuToggle.checked);
        });
    }

    // click outside to close
    document.addEventListener('click', (e) => {
        if (
            navbar.classList.contains('active') &&
            !navbar.contains(e.target) &&
            !menu.contains(e.target)
        ) {
            menuToggle.checked = false;
            navbar.classList.remove('active');
        }
    });
});