import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, makeStyles, CardContent, CircularProgress, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        maxWidth: '350px'
    },
    img: {
        width: '45px',
        height: '45px'
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    date: {
        color: '#ff6000'
    },
    location: {
        fontWeight: 'bold',
        marginBottom: '40px'
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

const WeatherCard = ({ city }) => {

    const classes = useStyles();
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        console.log(city);
        getWeatherDataByCity();
    }, []);

    const getWeatherDataByCity = async () => {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=55f7264e4bbd2d08f2e907c81b9e2fcf&units=metric&lang=ru`);
        setWeatherData(result.data);
    }

    // const getWeatherData = async (currentPosition) => {
    //     console.log(currentPosition);
    //     const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.coords.latitude}&lon=${currentPosition.coords.longitude}&appid=55f7264e4bbd2d08f2e907c81b9e2fcf&units=metric&lang=ru`);
    //     setWeatherData(result.data);
    // }

    const getCurrentDate = () => {
        const date = new Date();
        return date.toLocaleString();
    }

    return <div>
        {weatherData
            ? <Card className={classes.card}>
                <CardContent>
                    <Box>
                        <Typography className={classes.date} variant='subtitle1' align='left'>{getCurrentDate()}</Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.location} variant='h5' align='left'>{weatherData.name}, {weatherData.sys.country}</Typography>
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