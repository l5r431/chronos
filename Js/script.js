// ===== EDIT YOUR CONTACT DETAILS HERE =====
const CONTACT = {
    email: 'contact@fridaycore.win',
    telegram: 'l5r431',
    whatsapp: '256747006987', // country code + number, digits only (no + or spaces)
    phone: '+256747006987'
};

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

    // =========================
    // CLOSE DRAWER WHEN A LINK IS TAPPED
    // =========================
    if (navbar && menuToggle) {
        navbar.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => {
                menuToggle.checked = false;
                navbar.classList.remove('active');
            });
        });
    }

    // =========================
    // HIGHLIGHT THE CURRENT SECTION IN THE SIDEBAR
    // =========================
    const spyLinks = [...document.querySelectorAll('.ink[href^="#"]')]
        .map((a) => ({ a, el: document.getElementById(a.getAttribute('href').slice(1)) }))
        .filter((x) => x.el);
    let spyQueued = false;
    const spy = () => {
        spyQueued = false;
        let current = null;
        spyLinks.forEach((x) => {
            if (x.el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = x;
        });
        spyLinks.forEach((x) => x.a.classList.toggle('active', x === current));
    };
    window.addEventListener('scroll', () => {
        if (!spyQueued) { spyQueued = true; requestAnimationFrame(spy); }
    }, { passive: true });
    spy();

    // =========================
    // FLOATING CONTACT ICONS + SCROLL-TO-TOP
    // =========================
    const wa = (text) => `https://wa.me/${CONTACT.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : '');
    document.querySelectorAll('[data-contact="call"]').forEach((a) => { a.href = `tel:${CONTACT.phone}`; });
    document.querySelectorAll('[data-contact="whatsapp"]').forEach((a) => { a.href = wa('Hi, I found you through your portfolio.'); });

    const topBtn = document.querySelector('.top-wrapper');
    const onScrollTop = () => topBtn && topBtn.classList.toggle('show', window.scrollY > 300);
    window.addEventListener('scroll', onScrollTop, { passive: true });
    onScrollTop();

    // =========================
    // QUOTE POPUP (email / telegram / whatsapp / call)
    // =========================
    const dlg = document.getElementById('quote-dialog');
    if (dlg && typeof dlg.showModal === 'function') {
        const planEl = document.getElementById('q-plan');
        const opt = (m) => dlg.querySelector(`[data-method="${m}"]`);
        document.querySelectorAll('[data-quote]').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const plan = btn.dataset.quote;
                const msg = `Hi, I would like a quote for: ${plan}`;
                planEl.textContent = plan;
                opt('email').href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Quote request: ' + plan)}&body=${encodeURIComponent(msg + '\n\nMy name:\nMy budget:\nDeadline:')}`;
                opt('telegram').href = `https://t.me/${CONTACT.telegram}`;
                opt('whatsapp').href = wa(msg);
                opt('call').href = `tel:${CONTACT.phone}`;
                dlg.showModal();
            });
        });
        dlg.addEventListener('click', (e) => {
            if (e.target === dlg || e.target.closest('.q-close')) dlg.close();
        });
        dlg.querySelectorAll('.q-opt').forEach((a) => {
            a.addEventListener('click', () => setTimeout(() => dlg.close(), 150));
        });
    }
});
