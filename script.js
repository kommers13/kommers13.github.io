document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
    });
});