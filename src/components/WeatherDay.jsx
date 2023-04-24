import React from 'react'
import dayCss from '../css/WeatherDay.module.css'
import styled from 'styled-components';

// Styled component to display the temperature bar with appropriate color gradients

const WeatherBar = styled.div`
  height: 10px;
  width: ${props => props.temp*1.3}px;
  min-width: 30px;
  border-radius: 10px;
  background: ${props => {
    if (props.temp < 30) return 'linear-gradient(to right, #b3e0ff, #4da6ff)';
    if (props.temp >= 30 && props.temp < 50) return 'linear-gradient(to right, #a7d1e8, #2980b9)';
    if (props.temp >= 50 && props.temp < 65) return 'linear-gradient(to right, #ffd1b3, #ffb347)';
    if (props.temp >= 65 && props.temp < 80) return 'linear-gradient(to right, #ffb347, #ff8c00)';
    if (props.temp >= 80 && props.temp < 90) return 'linear-gradient(to right, #e74c3c, #ff6347)';
    if (props.temp >= 90 && props.temp < 100) return 'linear-gradient(to right, #ff4500, #ff6347)';
    return 'linear-gradient(to right, #bdc3c7, #34495e)';
  }};

  @media (max-width: 600px) {
    width: ${props => props.temp/2}px;
  }
`;

//props contain information for that days weather report: weekDay, image, lowTemp, highTemp
const WeatherDay = (props) => {
     
  return (
    <div className={dayCss.container}>
        <div className={dayCss.dayInfoWrapper}>
            <ul className={dayCss.dayInfo}>
                <li className={dayCss.day}>{props.data[0]}</li>
                <li className={dayCss.image}><img src={props.data[1].icon} alt={props.data[1].text} /></li>
                <li className={dayCss.weatherBar}><WeatherBar temp={props.data[3]}></WeatherBar></li>
                <li className={dayCss.low}>{Math.round(props.data[2])}°</li>
                <li className={dayCss.high}>{Math.round(props.data[3])}°</li>
            </ul>
        </div>
    </div>
  )
}

export default WeatherDay