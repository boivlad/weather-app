import './App.css';
import { useEffect } from 'react';
import WeatherCard from './components/WeatherCard';

function App() {

  useEffect(
    () => {
      // navigator.geolocation.getCurrentPosition(getWeatherData, console.error, { enableHighAccuracy: true, maximumAge: 5000 });
    }, []
  );


  return (
    <div className="App">
      <WeatherCard city="Odessa" />
      <WeatherCard city="Kiev" />
    </div>
  );
}

export default App;
