import './App.css';
import { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import WeatherInput from './components/WeatherInput';
import {Alert} from '@mui/material';
import {Box, Typography} from '@material-ui/core';

function App() {

  const [cities, setCities] = useState([])
  const [alert, setAlert] = useState(null)

  useEffect(
    () => {
      const savedCities = localStorage.getItem("cities");
      if(savedCities){
        setCities(JSON.parse(savedCities));
      }
    }, []
  );

  const addCity = (value) => {
    const newCities = [...cities, value];
    setCities(newCities);
    const filteredCities = newCities.filter((item)=>!!item);
    localStorage.setItem("cities", JSON.stringify(filteredCities));
  }

  const removeCity = (index) => {
    console.log('index', index);
    const newCities = [...cities];
    newCities.splice(index, 1);
    const filteredCities = newCities.filter((item)=>!!item);
    localStorage.setItem("cities", JSON.stringify(filteredCities));

    const newCitiesForState = [...cities];
    delete newCitiesForState[index];
    setCities(newCitiesForState);
  }


  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleString();
  }
  
  return (
    <div className="App">
      {alert && <Alert severity="error">{alert}</Alert>}
      <Box>
          <Typography style={{color: '#ff6000'}} variant='subtitle1' align='left'>{getCurrentDate()}</Typography>
      </Box>
      <WeatherInput addCity={addCity} />
      <WeatherCard geolocation={true} />
      {cities.map((city, index) => {
        return <>{city && <WeatherCard key={index} index={index} city={city} removeCity={removeCity} alert={setAlert} />}</>
      })}
    </div>
  );
}

export default App;
