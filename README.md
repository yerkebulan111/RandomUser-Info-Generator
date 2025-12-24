# Random User Information Portal

A comprehensive web application that integrates multiple APIs to display random user information, country details, exchange rates, and related news headlines.

## Project Overview

This project demonstrates API integration using Node.js backend and pure HTML/CSS/JavaScript frontend. It fetches data from multiple sources and presents it in a clean, responsive interface.

## Features

### 1. Random User Generator
- Fetches random user data from RandomUser.me API
- Displays: Name, Gender, Age, Date of Birth, Profile Picture, Address, City, and Country
- Presented in an attractive card layout with profile image

### 2. Country Information
- Automatically fetches country details based on user's country
- Uses REST Countries API
- Displays: Country Name, Capital, Languages, Currency, and National Flag

### 3. Exchange Rates
- Shows real-time currency conversion rates
- Compares user's local currency to USD and KZT
- Integrated with Exchange Rate API

### 4. News Headlines
- Fetches 5 latest news articles related to the user's country
- Displays: Headline, Image, Description, Source, and Link to full article
- Uses News API with English language filter

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client for API requests
- **dotenv** - Environment variable management

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with responsive design
- **Vanilla JavaScript** - Logic and DOM manipulation

## Project Structure

```
RandomUser-Info-Generator/
│
├── index.js              # Main server file with API endpoints
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables (API keys)
├── .gitignore            # Git ignore rules
├── README.md             # Project documentation
│
└── public/               # Frontend files
    ├── index.html        # Main HTML file
    ├── style.css         # CSS styling
    └── script.js         # JavaScript logic
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- API keys for external services

### Step 1: Clone or Download the Project
```bash
# If using Git
git clone https://github.com/yerkebulan111/RandomUser-Info-Generator.git
cd RandomUser-Info-Generator

# Or extract the ZIP file
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure API Keys

Create a `.env` file in the root directory and add your API keys:

```env
EXCHANGE_RATE_API_KEY=your_key_here
NEWS_API_KEY=your_key_here
```

#### Where to Get API Keys:

1. **Exchange Rate API**
   - Visit: https://www.exchangerate-api.com/
   - Sign up for a free account
   - Copy your API key

2. **News API**
   - Visit: https://newsapi.org/
   - Register for a free account
   - Copy your API key


### Step 4: Run the Server
```bash

npm start

```

### Step 5: Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Click the "Generate Random User" button
2. Wait for the data to load (all API calls are made server-side)
3. View the displayed information:
   - User profile and details
   - Country information with flag
   - Exchange rates comparison
   - Latest news from the user's country
4. Click on news links to read full articles

## API Integration Details

### 1. Random User API
- **Endpoint**: `https://randomuser.me/api/`
- **Method**: GET
- **Server Route**: `/api/user-data`
- **Data Extracted**: Personal information, location details

### 2. REST Countries API
- **Endpoint**: `https://restcountries.com/v3.1/name/{country}`
- **Method**: GET
- **Parameters**: Country name from Random User
- **Data Extracted**: Country details, currency code for exchange rates

### 3. Exchange Rate API
- **Endpoint**: `https://v6.exchangerate-api.com/v6/{api_key}/latest/{currency}`
- **Method**: GET
- **Parameters**: Currency code from REST Countries
- **Data Extracted**: Conversion rates for USD and KZT

### 4. News API
- **Endpoint**: `https://newsapi.org/v2/everything`
- **Method**: GET
- **Parameters**: 
  - `q`: Country name
  - `language`: en
  - `pageSize`: 5
- **Data Extracted**: Headlines, images, descriptions, URLs

## 🎨 Design Decisions

### Backend Architecture
- **Single Endpoint Design**: All API calls are made in one endpoint (`/api/user-data`) to minimize frontend complexity and ensure data consistency
- **Sequential API Calls**: APIs are called in order where each depends on the previous (User → Country → Exchange → News)
- **Error Handling**: Comprehensive try-catch blocks with meaningful error messages
- **Environment Variables**: Secure API key management using dotenv

### Frontend Architecture
- **Separation of Concerns**: HTML for structure, CSS for styling, JS for logic
- **Modular JavaScript**: Functions are separated by responsibility (display, fetch, utility)
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Loading States**: Visual feedback during data fetching
- **Error Display**: User-friendly error messages

### UI/UX Decisions
- **Card-Based Layout**: Clean, organized presentation of information
- **Color Scheme**: Purple gradient for visual appeal
- **Image Optimization**: Rounded profile pictures, flag images
- **Interactive Elements**: Hover effects on news items and buttons
- **Accessibility**: Semantic HTML, proper alt texts, high contrast

## Security Considerations

- API keys stored in environment variables (not in code)
- `.gitignore` configured to exclude `.env` file
- Input validation and sanitization in backend
- XSS protection through HTML escaping in frontend
- No sensitive data exposed to client

## Error Handling

The application handles various error scenarios:
- API request failures
- Missing data fields
- Network timeouts
- Invalid responses
- User-friendly error messages displayed


## Data Flow

1. User clicks "Generate Random User" button
2. Frontend sends GET request to `/api/user-data`
3. Backend fetches data from Random User API
4. Backend uses country name to fetch REST Countries data
5. Backend uses currency code to fetch exchange rates
6. Backend uses country name to fetch news articles
7. Backend sends consolidated data to frontend
8. Frontend displays all information in organized sections

## Configuration

### Server Port
The server runs on port 3000 by default. 

### API Rate Limits
Be aware of API rate limits:
- News API: 100 requests/day (free tier)
- Exchange Rate API: 1,500 requests/month (free tier)
- Random User API: No strict limits

## Testing

To test the application:
1. Start the server
2. Click the button multiple times to generate different users
3. Verify all sections display correctly
4. Test on different screen sizes
5. Check browser console for any errors

## Known Limitations

- News API free tier has daily request limits
- Some countries may not have news articles available
- Exchange rates update once per day
- Random User API may occasionally return incomplete address data


## License

This project is created for educational purposes as part of a Web Technologies course assignment.

## Author

Created as Assignment 2 for Web Technologies 2 (Back End) course.

## Acknowledgments

- Random User API - https://randomuser.me/
- REST Countries API - https://restcountries.com/
- Exchange Rate API - https://www.exchangerate-api.com/
- News API - https://newsapi.org/
