const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const { format, isToday, parseISO } = require('date-fns');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
fs.ensureDirSync(DATA_DIR);

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeJsonSync(USERS_FILE, {});
}

// Zodiac signs mapping
const ZODIAC_SIGNS = {
  'aries': { start: [3, 21], end: [4, 19], element: 'fire' },
  'taurus': { start: [4, 20], end: [5, 20], element: 'earth' },
  'gemini': { start: [5, 21], end: [6, 20], element: 'air' },
  'cancer': { start: [6, 21], end: [7, 22], element: 'water' },
  'leo': { start: [7, 23], end: [8, 22], element: 'fire' },
  'virgo': { start: [8, 23], end: [9, 22], element: 'earth' },
  'libra': { start: [9, 23], end: [10, 22], element: 'air' },
  'scorpio': { start: [10, 23], end: [11, 21], element: 'water' },
  'sagittarius': { start: [11, 22], end: [12, 21], element: 'fire' },
  'capricorn': { start: [12, 22], end: [1, 19], element: 'earth' },
  'aquarius': { start: [1, 20], end: [2, 18], element: 'air' },
  'pisces': { start: [2, 19], end: [3, 20], element: 'water' }
};

// Calculate zodiac sign from birth date
function getZodiacSign(birthDate) {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  for (const [sign, data] of Object.entries(ZODIAC_SIGNS)) {
    const [startMonth, startDay] = data.start;
    const [endMonth, endDay] = data.end;
    
    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (startMonth > endMonth && (month === startMonth || month === endMonth))
    ) {
      return { sign, element: data.element };
    }
  }
  return { sign: 'unknown', element: 'unknown' };
}

// Get weather data
async function getWeatherData(lat, lon) {
  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_key';
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    // Return mock weather data if API fails
    return {
      weather: [{ main: 'Clear', description: 'clear sky' }],
      main: { temp: 20, humidity: 50 },
      wind: { speed: 5 }
    };
  }
}

// Generate fortune based on zodiac, weather, and randomness
function generateFortune(zodiacData, weatherData, userHash) {
  const { sign, element } = zodiacData;
  const weather = weatherData.weather[0];
  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  
  // Create a seed based on user hash and current date for consistent daily results
  const today = format(new Date(), 'yyyy-MM-dd');
  const seed = userHash + today;
  const random = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) / 2147483647;
  };
  
  const baseRandom = random(seed);
  const weatherRandom = random(seed + weather.main);
  const tempRandom = random(seed + temp.toString());
  
  // Calculate fortune components
  const shouldOvertime = element === 'fire' ? 
    (temp > 25 ? baseRandom > 0.3 : baseRandom > 0.6) :
    element === 'water' ? 
    (humidity > 70 ? baseRandom > 0.4 : baseRandom > 0.7) :
    baseRandom > 0.5;
  
  const bugCount = Math.floor(weatherRandom * 10) + 
    (weather.main === 'Rain' ? 2 : 0) +
    (temp < 10 ? 3 : temp > 30 ? 2 : 0);
  
  const commitSuggestions = [
    'Early morning commits bring good luck',
    'Afternoon coding sessions are favored today',
    'Late night commits might introduce bugs',
    'Pair programming is highly recommended',
    'Focus on refactoring existing code',
    'Perfect day for implementing new features',
    'Code reviews will be particularly insightful',
    'Documentation updates are blessed today'
  ];
  
  const commitAdvice = commitSuggestions[Math.floor(tempRandom * commitSuggestions.length)];
  
  const codeQuality = Math.floor((1 - baseRandom) * 100);
  
  const learningTopics = [
    'Machine Learning algorithms',
    'System Design patterns',
    'Database optimization',
    'Frontend frameworks',
    'DevOps practices',
    'Security best practices',
    'API design principles',
    'Performance optimization'
  ];
  
  const learningTopic = learningTopics[Math.floor(weatherRandom * learningTopics.length)];
  
  return {
    zodiacSign: sign,
    element: element,
    shouldOvertime: shouldOvertime,
    expectedBugs: Math.max(0, bugCount),
    commitAdvice: commitAdvice,
    codeQualityScore: Math.max(10, codeQuality),
    learningRecommendation: learningTopic,
    weatherInfluence: weather.description,
    luckyLanguage: ['JavaScript', 'Python', 'Go', 'Rust', 'TypeScript'][Math.floor(baseRandom * 5)],
    productivityScore: Math.floor((baseRandom + (1 - weatherRandom)) * 50) + 25
  };
}

// Check if user already got fortune today
function hasUserGotFortuneToday(userHash) {
  const users = fs.readJsonSync(USERS_FILE);
  const user = users[userHash];
  
  if (!user || !user.lastAccess) {
    return false;
  }
  
  return isToday(parseISO(user.lastAccess));
}

// Save user access
function saveUserAccess(userHash, fortune) {
  const users = fs.readJsonSync(USERS_FILE);
  users[userHash] = {
    lastAccess: new Date().toISOString(),
    lastFortune: fortune
  };
  fs.writeJsonSync(USERS_FILE, users);
}

// Get user's last fortune if accessed today
function getUserTodayFortune(userHash) {
  const users = fs.readJsonSync(USERS_FILE);
  const user = users[userHash];
  
  if (user && user.lastAccess && isToday(parseISO(user.lastAccess))) {
    return user.lastFortune;
  }
  
  return null;
}

// Routes
app.post('/api/fortune', async (req, res) => {
  try {
    const { birthDate, latitude, longitude, userHash } = req.body;
    
    if (!birthDate || !latitude || !longitude || !userHash) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check if user already got fortune today
    if (hasUserGotFortuneToday(userHash)) {
      const existingFortune = getUserTodayFortune(userHash);
      return res.json({
        ...existingFortune,
        message: 'You have already received your fortune for today!'
      });
    }
    
    // Calculate zodiac sign
    const zodiacData = getZodiacSign(birthDate);
    
    // Get weather data
    const weatherData = await getWeatherData(latitude, longitude);
    
    // Generate fortune
    const fortune = generateFortune(zodiacData, weatherData, userHash);
    
    // Save user access
    saveUserAccess(userHash, fortune);
    
    res.json(fortune);
  } catch (error) {
    console.error('Error generating fortune:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
