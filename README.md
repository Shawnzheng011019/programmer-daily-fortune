# 🔮 Programmer Fortune

A fun web application that generates daily coding fortunes for programmers based on their zodiac sign, local weather conditions, and a touch of randomness. Get personalized predictions about your coding day, including bug expectations, productivity scores, and learning recommendations!

## ✨ Features

- **Daily Fortune Generation**: Get a unique fortune once per day based on your birth date and location
- **Zodiac-Based Predictions**: Fortunes are influenced by your astrological sign and element
- **Weather Integration**: Local weather conditions affect your coding predictions
- **Comprehensive Insights**: Receive predictions about:
  - Whether you should work overtime
  - Expected number of bugs
  - Code quality score (0-100)
  - Productivity score (25-75)
  - Commit timing advice
  - Learning topic recommendations
  - Lucky programming language for the day
- **Persistent Storage**: One fortune per user per day (stored locally)
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Date-fns** - Modern date utility library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Axios** - HTTP client for external API calls
- **CORS** - Cross-origin resource sharing
- **fs-extra** - Enhanced file system operations
- **Date-fns** - Date manipulation utilities

## 📁 Project Structure

```
programmer-pred/
├── backend/
│   ├── data/                 # User data storage
│   ├── node_modules/         # Backend dependencies
│   ├── package.json          # Backend package configuration
│   ├── package-lock.json     # Backend dependency lock file
│   └── server.js             # Main server file
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── FortuneDisplay.jsx
│   │   │   ├── FortuneForm.jsx
│   │   │   └── Header.jsx
│   │   ├── assets/           # Frontend assets
│   │   ├── App.jsx           # Main App component
│   │   ├── App.css           # App styles
│   │   ├── index.css         # Global styles
│   │   └── main.jsx          # React entry point
│   ├── node_modules/         # Frontend dependencies
│   ├── package.json          # Frontend package configuration
│   ├── package-lock.json     # Frontend dependency lock file
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── eslint.config.js      # ESLint configuration
├── LICENSE                   # MIT License
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd programmer-pred
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory (optional):

```env
PORT=3001
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

**Note**: The application will work without an OpenWeather API key by using mock weather data. To get real weather data, sign up at [OpenWeatherMap](https://openweathermap.org/api) for a free API key.

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   # or for development with auto-reload:
   npm run dev
   ```
   The backend will run on `http://localhost:3001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📡 API Documentation

### POST /api/fortune

Generate a daily fortune for a user.

**Request Body:**
```json
{
  "birthDate": "1990-05-15",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "userHash": "unique_user_identifier"
}
```

**Response:**
```json
{
  "zodiacSign": "taurus",
  "element": "earth",
  "shouldOvertime": false,
  "expectedBugs": 3,
  "commitAdvice": "Early morning commits bring good luck",
  "codeQualityScore": 85,
  "learningRecommendation": "Machine Learning algorithms",
  "weatherInfluence": "clear sky",
  "luckyLanguage": "JavaScript",
  "productivityScore": 68
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🎯 How It Works

1. **User Input**: Users provide their birth date and allow location access
2. **Zodiac Calculation**: The system determines the user's zodiac sign and element
3. **Weather Data**: Current weather conditions are fetched based on location
4. **Fortune Generation**: A deterministic algorithm combines zodiac traits, weather conditions, and a daily seed to generate consistent daily predictions
5. **One Per Day**: Each user can only receive one fortune per day, stored locally

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Zodiac calculations based on traditional astrological dates
- Built with love for the programming community

---

**Disclaimer**: This application is for entertainment purposes only. Please don't make important career decisions based on your daily fortune! 😄

May your code compile and your bugs be few! 🐛✨
