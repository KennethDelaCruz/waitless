import React from 'react';

function hotTimes(number) {
  const minutes = number * 10;
  const minuteRange = minutes + 20;
  if (number === 0) {
    return (
      <span className="short-wait hot-time">No Wait!</span>
    );

  } else if (minutes < 30) {
    return (
      <span className="short-wait hot-time">{`${minutes} - ${minuteRange} minutes`}</span>
    );
  } else if (minutes < 60) {
    return (
      <span className="medium-wait hot-time">{`${minutes} - ${minuteRange + 10} minutes`}</span>
    );
  } else if (minutes >= 60) {
    return (
      <span className="high-wait hot-time">{`${minutes} - ${minuteRange + 20} minutes`}</span>
    );
  } else {
    return (
      <span className="unavailable-time hot-time">unavailable</span>
    );
  }
}

export default hotTimes;
