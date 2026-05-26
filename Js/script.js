 document.addEventListener('DOMContentLoaded', () => {
    const mode = document.getElementById('toggle');
    const menuToggle = document.getElementById('menu');
    const menu = document.querySelector('.menu');
    const navbar = document.querySelector('.navbar-mobile');

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'light') {
        document.body.classList.add('dark-mode');
        mode.checked = true;
    } 
    else if (savedTheme === 'dark') {
        document.body.classList.remove('dark-mode');
        mode.checked = false;
    } 
    else {
        // no saved theme → use system
        if (!systemDark) {
            document.body.classList.add('dark-mode');
            mode.checked = true;
        }
    }

    // =========================
    // TOGGLE THEME
    // =========================
    if (mode) {
        mode.addEventListener('change', () => {
            if (mode.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

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

    // =========================
    // MENU TOGGLE
    // =========================
if (menuToggle && navbar) {
    menuToggle.addEventListener('change', () => {
        navbar.classList.toggle('active', menuToggle.checked);
    });
}
});