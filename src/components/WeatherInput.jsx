import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

const WeatherInput = (props) => {
    const [weatherInput, setWeatherInput] = useState("")


    const inputHandler = (event) => {
        event.preventDefault();
        props.addCity(weatherInput);
    }

    const onChange = (event) => {
        setWeatherInput(event.target.value)
    }

    return <form onSubmit={inputHandler}>
        <TextField value={weatherInput} onChange={onChange} autoFocus={true} placeholder='Odessa' variant="standard" />
    </form>
}

export default WeatherInput