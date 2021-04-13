import React from 'react';

function hotTimes(number) {
  const integer = parseInt(number);

  const rangeNumber = number + 20;
  if (number < 30) {
    return (
      <span className="short-wait hot-time">{`${number} - ${rangeNumber} minutes`}</span>
    );
  } else if (number < 60) {
    return (
      <span className="medium-wait hot-time">{`${number} - ${rangeNumber + 10} minutes`}</span>
    );
  } else if (number >= 60) {
    return (
      <span className="high-wait hot-time">{`${number} - ${rangeNumber + 20} minutes`}</span>
    );
  } else {
    return (
      <span className="unavailable-time hot-time">Waitlist is unavailable</span>

    );
  }
}

export default hotTimes;
