import React from 'react';

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

interface DisplayWeatherProps {
  weather: WeatherData;
  location: string;
  unit: 'metric' | 'imperial' | 'standard';
}

const DisplayWeather: React.FC<DisplayWeatherProps> = ({ weather, location, unit }) => {
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

  return (
    <div className="weather-info">
      <div className="weather-header">
        <h2>{location}</h2>
        <img 
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
          alt={weather.description}
          className="weather-icon"
        />
      </div>
      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{Math.round(weather.temperature)}{getUnitSymbol()}</span>
          <span className="feels-like">Feels like: {Math.round(weather.feelsLike)}{getUnitSymbol()}</span>
        </div>
        <p className="description">{weather.description}</p>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{weather.windSpeed} {getSpeedUnit()}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{weather.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{weather.visibility} km</span>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather; 