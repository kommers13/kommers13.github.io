document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'theme-light';
    document.body.classList.add(currentTheme);

    document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light');

    const newTheme = document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
    localStorage.setItem('theme', newTheme);
});
});

