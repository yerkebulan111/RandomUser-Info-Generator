document.addEventListener('DOMContentLoaded', function() {
    const fetchUserBtn = document.getElementById('fetchUserBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const content = document.getElementById('content');
    const errorMessage = document.getElementById('errorMessage');

    fetchUserBtn.addEventListener('click', fetchUserData);

    async function fetchUserData() {
        
        fetchUserBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        content.classList.add('hidden');

        try {
            const response = await fetch('/api/user-data');
            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Failed to fetch data');
            }

            displayUserData(result.data);
            content.classList.remove('hidden');

        } catch (error) {
            showError(error.message);
        } finally {
            fetchUserBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
        }
    }

    function displayUserData(data) {
        displayUser(data.user);
        displayCountry(data.country);
        displayExchangeRates(data.exchangeRates);
        displayNews(data.news);
    }

    function displayUser(user) {
        document.getElementById('userPicture').src = user.picture;
        document.getElementById('userPicture').alt = `${user.firstName} ${user.lastName}`;
        document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('userGender').textContent = capitalizeFirstLetter(user.gender);
        document.getElementById('userAge').textContent = `${user.age} years old`;
        document.getElementById('userDob').textContent = user.dateOfBirth;
        document.getElementById('userAddress').textContent = user.address;
        document.getElementById('userCity').textContent = user.city;
        document.getElementById('userCountry').textContent = user.country;
    }

    function displayCountry(country) {
        document.getElementById('countryFlag').src = country.flag;
        document.getElementById('countryFlag').alt = `${country.name} flag`;
        document.getElementById('countryName').textContent = country.name;
        document.getElementById('countryCapital').textContent = country.capital;
        document.getElementById('countryLanguages').textContent = country.languages;
        document.getElementById('countryCurrency').textContent = country.currency;
    }

    function displayExchangeRates(rates) {
        const baseCurrency = rates.baseCurrency;
        const usdRate = rates.USD;
        const kztRate = rates.KZT;

        document.getElementById('rateUSD').textContent = 
            `1 ${baseCurrency} = ${usdRate} USD`;
        document.getElementById('rateKZT').textContent = 
            `1 ${baseCurrency} = ${kztRate} KZT`;
    }

    function displayNews(articles) {
        const newsContainer = document.getElementById('newsContainer');
        newsContainer.innerHTML = '';

        if (!articles || articles.length === 0) {
            newsContainer.innerHTML = '<p>No news articles available.</p>';
            return;
        }

        articles.forEach(article => {
            const newsItem = createNewsItem(article);
            newsContainer.appendChild(newsItem);
        });
    }

    function createNewsItem(article) {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        const hasImage = article.image && article.image.trim() !== '';
        
        newsItem.innerHTML = `
            ${hasImage ? `<img src="${article.image}" alt="${article.title}" class="news-image">` : ''}
            <div class="news-content">
                <span class="news-source">${escapeHtml(article.source)}</span>
                <h3 class="news-title">${escapeHtml(article.title)}</h3>
                <p class="news-description">${escapeHtml(article.description)}</p>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-link">
                    Read full article →
                </a>
            </div>
        `;

        return newsItem;
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});