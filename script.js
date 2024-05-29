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


let distros = [];

fetch('dist.json')
    .then(response => response.json())
    .then(data => {
        distros = data;
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));

function filterDistros(cpuCores, cpuFrequency, ram, gpu, preferences) {
    return distros.filter(distro =>
        distro.minCpu <= cpuCores &&
        distro.minFrequency <= cpuFrequency &&
        distro.minRam <= ram &&
        (distro.minGpu === "integrated" ||
            (distro.minGpu === "budget" && (gpu === "budget" || gpu === "midrange" || gpu === "highend")) ||
            (distro.minGpu === "midrange" && (gpu === "midrange" || gpu === "highend")) ||
            (distro.minGpu === "highend" && gpu === "highend")) &&
        preferences.some(preference => distro.preferences.includes(preference))
    );
}

document.getElementById('distroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cpuCores = parseInt(document.getElementById('cpuCores').value);
    const cpuFrequency = parseFloat(document.getElementById('cpuFrequency').value);
    const ram = parseInt(document.getElementById('ram').value);
    const gpu = document.getElementById('gpu').value;
    const preferences = Array.from(document.getElementById('preferences').selectedOptions).map(option => option.value);

    const filteredDistros = filterDistros(cpuCores, cpuFrequency, ram, gpu, preferences);

    const resultsContainer = document.getElementById('distroResults');
    resultsContainer.innerHTML = '';

    if (filteredDistros.length > 0) {
        filteredDistros.forEach(distro => {
            const distroElement = document.createElement('div');
            distroElement.className = 'soft-block';
            distroElement.innerHTML = `<h3>${distro.name}</h3>`;
            resultsContainer.appendChild(distroElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>Нет подходящих дистрибутивов</p>';
    }
});
