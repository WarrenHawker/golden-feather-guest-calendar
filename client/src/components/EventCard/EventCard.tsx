import { useEffect, useState } from 'react';
import { EventData } from '../../data';
import { formatDate } from '../../functions/formatDate';

type Props = {
  data: EventData;
};

const EventCard = ({ data }: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date(data.dateTime));

  useEffect(() => {
    // Function to fetch user's timezone from IP address
    const fetchUserTimezone = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        const timezone = data.timezone;
        updateCurrentTime(timezone);
      } catch (error) {
        console.error('Error fetching timezone:', error);
      }
    };

    // Function to update current time based on timezone
    const updateCurrentTime = (timezone) => {
      const offset = new Date().getTimezoneOffset() / 60; // Get offset from UTC
      const currentTime = new Date(
        new Date().toLocaleString('en-US', { timeZone: timezone })
      );
      const adjustedTime = new Date(
        currentTime.getTime() + offset * 3600 * 1000
      );
      setCurrentTime(adjustedTime);
    };

    fetchUserTimezone();

    // Update time every minute
    const intervalId = setInterval(() => {
      fetchUserTimezone();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h2>{formatDate(data.dateTime)}</h2>
      <p>{formatDate(currentTime)}</p>
    </>
  );
};

export default EventCard;
