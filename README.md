# Weather Application

A modern, user-friendly weather application built with React and TypeScript that provides real-time weather information for any location worldwide.

## Features

- 🔍 Search weather by city name or ZIP code
- 🌡️ Multiple unit systems support:
  - Metric (°C)
  - Imperial (°F)
  - Standard (K)
- 📊 Detailed weather information:
  - Current temperature
  - Weather description
  - Humidity
  - Wind speed
  - Feels like temperature
  - Atmospheric pressure
  - Visibility
- 🌤️ Weather icons for visual representation
- ⌨️ Keyboard support (Enter key for search)
- 🎨 Clean and responsive user interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd weather-api
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Usage

1. Select your preferred search method (City or ZIP Code)
2. Enter the location name or ZIP code
3. Choose your preferred unit system
4. Click Search or press Enter
5. View the detailed weather information for your location

## Technologies Used

- React
- TypeScript
- CSS
- OpenWeatherMap API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
