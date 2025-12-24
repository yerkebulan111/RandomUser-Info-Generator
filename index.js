const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));


app.get('/api/user-data', async (req, res) => {
  try {
    
    const userResponse = await axios.get('https://randomuser.me/api/');
    const user = userResponse.data.results[0];

    
    const userData = {
      firstName: user.name.first,
      lastName: user.name.last,
      gender: user.gender,
      picture: user.picture.large,
      age: user.dob.age,
      dateOfBirth: new Date(user.dob.date).toLocaleDateString(),
      city: user.location.city,
      country: user.location.country,
      address: `${user.location.street.number} ${user.location.street.name}`
    };

    
    const countryResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${userData.country}?fullText=true`
    );

    const countryData = countryResponse.data[0];
    const currency = Object.keys(countryData.currencies)[0];
    const currencyName = countryData.currencies[currency].name;

    const countryInfo = {
      name: countryData.name.common,
      capital: countryData.capital ? countryData.capital[0] : 'N/A',
      languages: Object.values(countryData.languages).join(', '),
      currency: `${currency} (${currencyName})`,
      currencyCode: currency,
      flag: countryData.flags.png
    };

    
    const exchangeRateResponse = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${currency}`
    );

    const rates = exchangeRateResponse.data.conversion_rates;
    const exchangeRates = {
      baseCurrency: currency,
      USD: rates.USD ? rates.USD.toFixed(2) : 'N/A',
      KZT: rates.KZT ? rates.KZT.toFixed(2) : 'N/A'
    };

    
    const newsResponse = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: userData.country,
        language: 'en',
        pageSize: 5,
        sortBy: 'publishedAt',
        apiKey: process.env.NEWS_API_KEY
      }
    });

    const news = newsResponse.data.articles.map(article => ({
      title: article.title,
      description: article.description || 'No description available',
      image: article.urlToImage || '',
      url: article.url,
      source: article.source.name
    }));

    
    res.json({
      success: true,
      data: {
        user: userData,
        country: countryInfo,
        exchangeRates: exchangeRates,
        news: news
      }
    });

  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching data. Please try again.',
      error: error.message
    });
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});