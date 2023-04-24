import React from 'react'

const GetDay = ({ dateString }) => {
  // Convert the date string to a Date object
  const date = new Date(dateString);

  // Get the day of the week from the Date object
  const dayOfWeek = date.getDay();

  // Define an array of day names
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get the day name from the array using the day of the week index
  const dayName = days[dayOfWeek];

  // Check if the date is today
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  return (
    <div>
      <p>{isToday ? 'Today' : dayName}</p>
    </div>
  );
};

export default GetDay;
