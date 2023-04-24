import React, { useState, useEffect } from 'react';
import dashboardCss from '../css/Dashboard.module.css';
import Header from './Header';
import WeatherBox from './WeatherBox';
import LocationSettingsErr from './LocationSettingsErr';
import axios from 'axios';

const Dashboard = () => {
  // State variables
  const [location, setLocation] = useState([]);
  const [forecastDays, setForecastDays] = useState([]);
  const [zipCode, setZipCode] = useState("95014");
  const [newCode, setNewCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationSetError, setLocationSetError] = useState(false);
  const [invalidLocation, setInvalidLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the current location from the browser's geolocation API
  const getCurrentLoc = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInvalidLocation("");

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d53678aef78a432db8cb2dcdb4f50f1f`
          );

          const { components } = response.data.results[0];
          const zipCode = components.postcode;
          setZipCode(zipCode);
          setLoading(false);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLoading(false);
            setLocationSetError(true);
            return;
          } else {
            setLoading(false);
            console.error('Error obtaining geolocation:', error);
          }
          setLoading(false);
        },
        options
      );
    } else {
      console.error('Geolocation is not supported in this browser.');
      setLoading(false);
    }
  };

  // Fetch weather data from the API
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=9a06c229c2ad4f8eba315415232004&q=${zipCode}&days=11&aqi=no&alerts=no`
      )
      .then((response) => {
        setLoading(false);
        // Remove yesterday from the date range
        response.data.forecast.forecastday.shift()


        setLocation(response.data.location);
        setForecastDays(response.data.forecast.forecastday);
        setInvalidLocation(""); // Clear any previous error messages
      })
      .catch((err) => {
        setLoading(false);
        console.error('Error fetching weather data:', err);
        setInvalidLocation("Invalid Zipcode, city, or state");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setInvalidLocation("");
        }, 3000);
      });
  }, [zipCode]);

  // Handle form submission to change the zip code
  const submitHandler = (e) => {
    e.preventDefault();
    if (newCode === "") {
      setInvalidLocation("Invalid Zipcode, city, or state");
      setIsSubmitting(true);
      setTimeout(() => {
        setInvalidLocation("");
        setIsSubmitting(false);
      }, 3000);
      return;
    }
    setZipCode(newCode);
  };

  // Handle input change for the new zip code
  const onChangeHandler = (e) => {
    setNewCode(e.target.value)
    console.log(newCode)
  }

  return (
    <div className={dashboardCss.weatherBackground}>
      <Header />
      <div className={dashboardCss.zipFormWrapper}>
        <div className={dashboardCss.zipFormContainer}>
          {/* Form to change the zip code or city,state */}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              className={dashboardCss.zipInput}
              name="newCode"
              onChange={onChangeHandler}
              placeholder="Zipcode or city, state"
            />
            <button className={dashboardCss.zipButton} disabled={isSubmitting}>
              Get Forecast
            </button>
          </form>

          {/* Button to use the current location */}
          <div className={dashboardCss.currentLocWrapper}>
            <div className={dashboardCss.currentLoc}>
              <h3>Or</h3>
              <button className={dashboardCss.zipButton} onClick={getCurrentLoc}>
                Use Current Location
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error message for geolocation permission denied */}
      {locationSetError && <LocationSettingsErr onClose={() => setLocationSetError(false)} />}

      {/* Display the location for the weather */}
      <div className={dashboardCss.locationWrapper}>
        <div className={dashboardCss.location}>
          {invalidLocation ? (
            <h3>
              {invalidLocation ? (
                <span className={dashboardCss.locationError}>{invalidLocation}</span>
              ) : null}
            </h3>
          ) : loading ? (
            <h3>Loading...</h3>
          ) : (
            <h3>
              {location.name}, {location.region}, {location.country}
            </h3>
          )}
        </div>
      </div>

      {/* Display the weather forecast */}
      <div className={dashboardCss.boxWrapper}>
        <div className={dashboardCss.boxContainer}>
          <WeatherBox data={forecastDays} />
        </div>
      </div>

      {/*  weather API Logo and anchor*/}
      <div className={dashboardCss.weatherApi}>
        <span>
          Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
        </span>
        <div className="weatherImg">
          <a href="https://www.weatherapi.com/" title="Free Weather API">
            <img src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png" alt="Weather data by WeatherAPI.com" border="0" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

