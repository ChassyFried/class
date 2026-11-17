import { useState, useEffect } from 'react';

export default function Weather({ zip }) {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getWeather() {
            try {
                const API_KEY = "6df39ee8733744eec8aa0e14e94fead9";
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=${API_KEY}&units=imperial`
                );

                const data = await response.json();

                if (!response.ok) {
                    console.log("API ERROR:", data);
                    throw new Error(data.message || 'Could not fetch weather');
                }

                setWeather(data);

            } catch (err) {
                setError(err.message);
            }
        }

        getWeather();
    }, [zip]);

    if (error) return <p>{error}</p>;

    if (!weather) return <p>Loading weather...</p>;

    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <h3>{Math.round(weather.main.temp)}°F</h3>
            <p>{weather.weather[0].description}</p>

            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
            />
        </div>
    );
}