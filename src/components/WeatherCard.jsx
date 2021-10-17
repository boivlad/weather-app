import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, makeStyles, CardContent, CircularProgress, Box, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        maxWidth: '350px',
        margin: '20px'
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
    },
    img: {
        width: '45px',
        height: '45px'
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    location: {
        fontWeight: 'bold',
    },
    feels: {
        fontWeight: 'bold'
    },
    info: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    infoItem: {
        width: '50%'
    }

})

const WeatherCard = ({ city, geolocation, index, removeCity, alert }) => {

    const classes = useStyles();
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {

        if (city) {
            getWeatherDataByCity();
            return;
        }
        if (geolocation) {
            navigator.geolocation.getCurrentPosition(getWeatherDataByGeolocation, console.error, { enableHighAccuracy: true, maximumAge: 5000 });
        }

    }, []);


    const getWeatherDataByGeolocation = async (location) => {
        const { latitude, longitude } = location.coords;
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=55f7264e4bbd2d08f2e907c81b9e2fcf&units=metric&lang=ru`);
        setWeatherData(result.data);
    }

    const getWeatherDataByCity = async () => {
        try {
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=55f7264e4bbd2d08f2e907c81b9e2fcf&units=metric&lang=ru`);
            setWeatherData(result.data);
        } catch(error) {
            alert(error.message);
            removeCity(index);
        }
    }

    return <div>
        {weatherData
            ? <Card className={classes.card}>
                <CardContent>
                    <Box className={classes.top}>
                        <Typography className={classes.location} variant='h5' align='left'>{weatherData.name}, {weatherData.sys.country}</Typography>
                        {!geolocation && <Button onClick={()=>{removeCity(index)}}>X</Button>}
                    </Box>
                    <Box>
                        <Typography className={classes.header} variant='h4' align='left'><img className={classes.img} src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} /> {weatherData.main.temp.toFixed()}&#8451;</Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.feels} variant='subtitle2' align='left'>По ощущению {weatherData.main.feels_like.toFixed()}&#8451;.</Typography>
                    </Box>
                    <Box className={classes.info} >
                        <Box className={classes.infoItem}><Typography align='left'>Ветер: {weatherData.wind.speed} m/s</Typography></Box>
                        <Box className={classes.infoItem}><Typography align='left'>Давление: {weatherData.main.pressure} hPa</Typography></Box>
                        <Box className={classes.infoItem}><Typography align='left'>Влажность: {weatherData.main.humidity} &#x25;</Typography></Box>
                        <Box className={classes.infoItem}><Typography align='left'>Видимость: {(weatherData.visibility / 1000).toFixed(1)} км</Typography></Box>
                    </Box>
                </CardContent>
            </Card>
            : <CircularProgress />}
    </div>
}

export default WeatherCard;