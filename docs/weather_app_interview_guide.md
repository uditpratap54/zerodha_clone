WEATHER APP INTERVIEW GUIDE

Ye PDF Weather App ke liye Hinglish preparation notes hai. Isme React component flow, API integration, state management aur interview questions cover kiye gaye hain.

1. One-line Introduction

Weather App ek React + Vite based mini project hai jo city name ke basis par real-time weather details fetch karta hai.

2. Short Interview Intro

Ye project maine React fundamentals aur API integration practice ke liye banaya. User city search karta hai, app OpenWeather API hit karta hai aur current weather details ko Material UI card me show karta hai.

3. Tech Stack

- React
- Vite
- Material UI
- Fetch API
- OpenWeather API
- CSS

4. Main Features

- City-based weather search
- Real-time API data fetch
- Temperature, humidity, min/max display
- Weather condition based dynamic visuals
- Error message for invalid city

5. Architecture

- `App.jsx` root component hai
- `WeatherApp.jsx` parent state hold karta hai
- `SearchBox.jsx` input aur API request handle karta hai
- `InfoBox.jsx` fetched data ko UI card me render karta hai

6. Important Code with Line Meaning

Snippet A: parent state

```jsx
import SearchBox from "./SearchBox"; // Search component import hua
import InfoBox from "./InfoBox"; // Display component import hua
import { useState } from "react"; // React state hook import hui

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({ // Weather state define hui
        city: "Delhi", // Default city
        feelsLike:24.84, // Default feels-like temp
        temp: 25.05, // Default current temp
        tempMin: 25.05, // Default min temp
        tempMax: 25.05, // Default max temp
        humidity: 47, // Default humidity
        weather: "haze", // Default weather text
    });

    let updateInfo = (newInfo) => { // Child se updated data aane par chalega
        setWeatherInfo(newInfo); // Parent state update hogi
    }
```

Snippet B: API fetch

```jsx
let [city, setCity] = useState(""); // User input city state
let [error, setError] = useState(false); // Error show karne ke liye state
const API_URL = "https://api.openweathermap.org/data/2.5/weather"; // Weather endpoint
const API_KEY = "6ae9cb6fb6c691bf03dadb057ab5772b"; // API key currently hardcoded hai

let getWeatherInfo = async () => {
    let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`); // City ke basis par request
    let jsonResponse = await response.json(); // JSON parse hua

    let result = {
        city: city, // City save hui
        temp: jsonResponse.main.temp, // Current temp extract hua
        tempMin: jsonResponse.main.temp_min, // Min temp extract hua
        tempMax: jsonResponse.main.temp_max, // Max temp extract hua
        humidity: jsonResponse.main.humidity, // Humidity extract hui
        feelslike: jsonResponse.main.feels_like, // Feels-like value extract hui
        weather: jsonResponse.weather[0].description, // Description extract hui
    };
    return result; // Simplified result return hua
};
```

Snippet C: submit handler

```jsx
let handleSubmit = async (evt) => {
    evt.preventDefault(); // Browser page reload roka
    try {
        let newInfo = await getWeatherInfo(); // Fresh weather data fetch hua
        updateInfo(newInfo); // Parent ko update diya
        setCity(""); // Input reset hua
    } catch (err) {
        setError(true); // Failure par error message show hoga
    }
};
```

Snippet D: conditional UI

```jsx
image={
   info.humidity > 80 // High humidity check
   ? RAIN_URL // Rain image
   : info.temp > 15 // Warmer weather check
   ? HOT_URL // Hot image
   : COLD_URL // Otherwise cold image
}
```

7. Interview Questions

Q. Controlled input kya hota hai?
Answer:
Jab input ka value React state se manage hota hai to wo controlled input hota hai. Is app me city field controlled hai.

Q. API response normalize kyun ki?
Answer:
UI ko simple aur readable rakhne ke liye maine API ke nested response ko flat object me convert kiya.

Q. MUI kyun use kiya?
Answer:
Fast aur clean UI components ke liye, especially card and input components ko quickly style karne ke liye.

8. HR Style Answer

Ye project chhota hai but fundamentals strong karta hai. Isse maine React state, props flow, form handling aur external API integration ko clearly samjha.

9. Improvements

- API key ko `.env` me move karna
- Loading spinner add karna
- Better invalid city handling
- 5-day forecast add karna
- Search history add karna
