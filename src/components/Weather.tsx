import React, { useState } from 'react';
import './Weather.css';
import DisplayWeather from './DisplayWeather';

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  feelsLike: number;
  pressure: number;
  visibility: number;
}

type SearchType = 'city' | 'zip';
type UnitType = 'metric' | 'imperial' | 'standard';
type AppState = 'idle' | 'loading' | 'error' | 'success';

const Weather: React.FC = () => {
  const [searchType, setSearchType] = useState<SearchType>('city');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [unit, setUnit] = useState<UnitType>('metric');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [appState, setAppState] = useState<AppState>('idle');
  const [error, setError] = useState('');
  const [locationName, setLocationName] = useState('');

  const getUnitSymbol = () => {
    switch (unit) {
      case 'metric':
        return '°C';
      case 'imperial':
        return '°F';
      case 'standard':
        return 'K';
      default:
        return '°C';
    }
  };

  const getSpeedUnit = () => {
    switch (unit) {
      case 'metric':
        return 'm/s';
      case 'imperial':
        return 'mph';
      case 'standard':
        return 'm/s';
      default:
        return 'm/s';
    }
  };

  const handleSearch = async () => {
    if ((searchType === 'city' && !city) || (searchType === 'zip' && !zipCode)) return;
    
    setAppState('loading');
    setError('');
    
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const searchParam = searchType === 'city' 
        ? `q=${city}`
        : `zip=${zipCode}`;
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${searchParam}&appid=${apiKey}&units=${unit}`
      );
      const data = await response.json();
      
      if (data.cod === 200) {
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon,
          feelsLike: data.main.feels_like,
          pressure: data.main.pressure,
          visibility: data.visibility / 1000 // Convert to kilometers
        });
        setLocationName(data.name);
        setAppState('success');
        // Clear the other input
        if (searchType === 'city') {
          setZipCode('');
        } else {
          setCity('');
        }
      } else {
        setAppState('error');
        setError(data.message || 'Location not found');
      }
    } catch {
      setAppState('error');
      setError('Error fetching weather data. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return <div className="loading">Loading weather data...</div>;
      case 'error':
        return <div className="error">{error}</div>;
      case 'success':
        return weather && (
          <DisplayWeather 
            weather={weather}
            location={locationName}
            unit={unit}
          />
        );
      case 'idle':
      default:
        return <div className="welcome">Enter a location to get weather information</div>;
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="search-type">
        <button 
          className={`search-type-btn ${searchType === 'city' ? 'active' : ''}`}
          onClick={() => setSearchType('city')}
        >
          City
        </button>
        <button 
          className={`search-type-btn ${searchType === 'zip' ? 'active' : ''}`}
          onClick={() => setSearchType('zip')}
        >
          ZIP Code
        </button>
      </div>
      <div className="search-container">
        {searchType === 'city' ? (
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name"
          />
        ) : (
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter 5-digit ZIP code"
            pattern="[0-9]{5}"
            maxLength={5}
            inputMode="numeric"
          />
        )}
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="unit-selector">
        <label>
          <input
            type="radio"
            name="unit"
            value="metric"
            checked={unit === 'metric'}
            onChange={(e) => setUnit(e.target.value as UnitType)}
          />
          Metric (°C)
        </label>
        <label>
          <input
            type="radio"
            name="unit"
            value="imperial"
            checked={unit === 'imperial'}
            onChange={(e) => setUnit(e.target.value as UnitType)}
          />
          Imperial (°F)
        </label>
        <label>
          <input
            type="radio"
            name="unit"
            value="standard"
            checked={unit === 'standard'}
            onChange={(e) => setUnit(e.target.value as UnitType)}
          />
          Standard (K)
        </label>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Weather; 