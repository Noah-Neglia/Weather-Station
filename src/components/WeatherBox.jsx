import React from 'react';
import boxCss from '../css/WeatherBox.module.css';
import WeatherDay from './WeatherDay';
import GetDay from './GetDay';

const WeatherBox = (props) => {

  return (
    // Render the weather box with a header and a container for the weather days
    <div className={boxCss.box}>
      <div className={boxCss.rangeWrapper}>
        <h3 className={boxCss.forecastRange}>10-Day Forecast</h3>
      </div>
      <div className={boxCss.dayWrapper}>
        <div className={boxCss.dayContainer}>
          {/* Map over the array of weather data passed in as props, and render a WeatherDay component for each day */}
          {props.data.map((day, idx) => (
            <div key={idx}>
              {/* Render a WeatherDay component with props for the day's date, condition, minimum temperature, and maximum temperature */}
              <WeatherDay data={[
                // Pass a GetDay component to format the day's date
                <GetDay dateString={day.date} />,
                day.day.condition,
                day.day.mintemp_f,
                day.day.maxtemp_f
              ]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
