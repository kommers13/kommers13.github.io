document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'theme-light';
    document.body.classList.add(currentTheme);
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('theme-dark');
            document.body.classList.toggle('theme-light');
            const newTheme = document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
            localStorage.setItem('theme', newTheme);
            updateTheme(newTheme);
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const themeFromUrl = urlParams.get('theme');
    if (themeFromUrl) {
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(themeFromUrl);
        localStorage.setItem('theme', themeFromUrl);
    }
    const updateTheme = (theme) => {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            const url = new URL(link.href);
            url.searchParams.set('theme', theme);
            link.href = url.toString();
        });
    };
    updateTheme(currentTheme);

    class LinuxDistro {
        constructor(name, minCpu, minFrequency, minRam, minGpu, preferences) {
            this.name = name;
            this.minCpu = minCpu;
            this.minFrequency = minFrequency;
            this.minRam = minRam;
            this.minGpu = minGpu;
            this.preferences = preferences;
        }
    }

    const distrosData = [
        { "name": "Ubuntu", "minCpu": 2, "minFrequency": 1.4, "minRam": 4, "minGpu": "integrated", "preferences": ["beginner", "development", "media", "enterprise"] },
        { "name": "Fedora", "minCpu": 2, "minFrequency": 1.9, "minRam": 4, "minGpu": "integrated", "preferences": ["development", "enterprise", "gaming"] },
        { "name": "Debian", "minCpu": 4, "minFrequency": 1.0, "minRam": 3, "minGpu": "budget", "preferences": ["development", "enterprise", "gaming"] },
        { "name": "Arch Linux", "minCpu": 4, "minFrequency": 1.7, "minRam": 4, "minGpu": "integrated", "preferences": ["development", "privacy"] },
        { "name": "Manjaro", "minCpu": 4, "minFrequency": 1.2, "minRam": 4, "minGpu": "midrange", "preferences": ["beginner", "development", "gaming"] },
        { "name": "Pop!_OS", "minCpu": 2, "minFrequency": 1.5, "minRam": 2, "minGpu": "budget", "preferences": ["development", "gaming", "media"] },
        { "name": "Elementary OS", "minCpu": 2, "minFrequency": 1.5, "minRam": 4, "minGpu": "integrated", "preferences": ["beginner", "media"] },
        { "name": "Zorin OS", "minCpu": 2, "minFrequency": 1.5, "minRam": 4, "minGpu": "integrated", "preferences": ["beginner", "media", "gaming"] },
        { "name": "Linux Mint", "minCpu": 2, "minFrequency": 1.0, "minRam": 2, "minGpu": "integrated", "preferences": ["beginner", "development", "media"] },
        { "name": "Kubuntu", "minCpu": 2, "minFrequency": 1.2, "minRam": 4, "minGpu": "integrated", "preferences": ["beginner", "media"] },
        { "name": "Kali Linux", "minCpu": 2, "minFrequency": 1.5, "minRam": 4, "minGpu": "integrated", "preferences": ["privacy", "development"] },
        { "name": "Mageia Linux", "minCpu": 2, "minFrequency": 1.2, "minRam": 4, "minGpu": "integrated", "preferences": ["beginner", "media", "development"] },
        { "name": "MX Linux", "minCpu": 1, "minFrequency": 1.4, "minRam": 2, "minGpu": "integrated", "preferences": ["beginner", "lightweight"] },
        { "name": "Slax Linux", "minCpu": 1, "minFrequency": 0.6, "minRam": 1, "minGpu": "integrated", "preferences": ["beginner", "lightweight", "media"] },
        { "name": "Xubuntu", "minCpu": 2, "minFrequency": 1.0, "minRam": 2, "minGpu": "integrated", "preferences": ["beginner", "lightweight", "gaming"] },
        { "name": "Slackware", "minCpu": 2, "minFrequency": 1.0, "minRam": 2, "minGpu": "integrated", "preferences": ["privacy", "development"] },
        { "name": "openSUSE", "minCpu": 4, "minFrequency": 1.5, "minRam": 4, "minGpu": "midrange", "preferences": ["development", "enterprise"] },
        { "name": "Void Linux", "minCpu": 2, "minFrequency": 1.0, "minRam": 3, "minGpu": "budget", "preferences": ["development", "privacy", "lightweight"] },
        { "name": "Gentoo", "minCpu": 2, "minFrequency": 1.8, "minRam": 4, "minGpu": "integrated", "preferences": ["development", "privacy", "gaming"] },
        { "name": "Parrot OS", "minCpu": 2, "minFrequency": 1.5, "minRam": 4, "minGpu": "integrated", "preferences": ["privacy", "development", "media"] },
        { "name": "Alt Linux", "minCpu": 4, "minFrequency": 1.8, "minRam": 2, "minGpu": "budget", "preferences": ["privacy", "development", "enterprise"] },
        { "name": "Rosa Linux", "minCpu": 2, "minFrequency": 1.5, "minRam": 4, "minGpu": "midrange", "preferences": ["privacy", "development", "enterprise", "media"] }
    ];

    const distros = distrosData.map(distroData => new LinuxDistro(distroData.name, distroData.minCpu, distroData.minFrequency, distroData.minRam, distroData.minGpu, distroData.preferences));

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

    const distroForm = document.getElementById('distroForm');
    if (distroForm) {
        distroForm.addEventListener('submit', function(event) {
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
                    distroElement.innerHTML = `<h3>${distro.name}</h3>
                        <button class="remove-btn">&times;</button>`;
                    resultsContainer.appendChild(distroElement);
                    const removeBtn = distroElement.querySelector('.remove-btn');
                    removeBtn.addEventListener('click', () => {
                        resultsContainer.removeChild(distroElement);
                    });
                });
            } else {
                resultsContainer.innerHTML = '<p>Нет подходящих дистрибутивов</p>';
            }
        });
    }

    const url = "https://api.coingecko.com/api/v3/simple/price";
    const params = {
        ids: "bitcoin,ethereum",
        vs_currencies: "usd"
    };

    async function getCryptoPrices() {
        try {
            const response = await fetch(`${url}?ids=${params.ids}&vs_currencies=${params.vs_currencies}`);
            if (!response.ok) {
                throw new Error("Ошибка при получении данных");
            }
            const data = await response.json();
            displayPrices(data);
        } catch (error) {
            console.error("Произошла ошибка при получении курсов криптовалют:", error.message);
        }
    }

    function displayPrices(prices) {
        const container = document.getElementById("crypto-container");
        container.innerHTML = "";
        const cryptos = {
            bitcoin: "Bitcoin",
            ethereum: "Ethereum",
        };
        for (const [key, value] of Object.entries(prices)) {
            const cryptoDiv = document.createElement("div");
            cryptoDiv.className = "crypto-price";
            const cryptoName = document.createElement("h2");
            cryptoName.textContent = cryptos[key];
            const cryptoPrice = document.createElement("p");
            let priceString = '';
            if (typeof value.usd === 'number') {
                priceString = value.usd.toFixed(6);
                cryptoPrice.textContent = `USD: ${priceString.slice(0, 6)}`;
            } else {
                cryptoPrice.textContent = "Невозможно получить цену";
            }

            cryptoDiv.appendChild(cryptoName);
            cryptoDiv.appendChild(cryptoPrice);
            container.appendChild(cryptoDiv);
        }
    }

    getCryptoPrices();

});
