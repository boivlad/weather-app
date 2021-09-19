import './App.css';
import { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import WeatherInput from './components/WeatherInput';

function App() {

  const [cities, setCities] = useState(["Kiev"])

  useEffect(
    () => {
      // navigator.geolocation.getCurrentPosition(getWeatherData, console.error, { enableHighAccuracy: true, maximumAge: 5000 });
    }, []
  );

  const addCity = (value) => {
    setCities([...cities, value]);
  }

  return (
    <div className="App">
      <WeatherInput addCity={addCity} />
      <WeatherCard geolocation={true} />
      {cities.map((city) => {
        return <WeatherCard city={city} />
      })}
    </div>
  );
}

export default App;
