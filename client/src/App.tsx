/* 
  App.tsx file

  Displays all components and fetches user's timezone from their IP address
  This is used to automatically update the event dates and times locally
  for the user.
*/

import { useEffect, useState } from 'react';
import EventCard from './components/EventCard/EventCard';
import eventDates, { EventData } from './data';
import Overlay from './components/Overlay/Overlay';
import GuestForm from './components/GuestForm/GuestForm';

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState<null | EventData>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [userTimezone, setUserTimezone] = useState('');

  useEffect(() => {
    // Function to fetch user's timezone from IP address
    const fetchUserTimezone = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        const timezone = data.timezone;
        setUserTimezone(timezone);
      } catch (error) {
        console.error('Error fetching timezone:', error);
      }
    };
    fetchUserTimezone();
  }, []);

  //activates when a user clicks on one of the event cards - opens overlay with GuestForm component in it
  const changeSelectedEvent = (id: string) => {
    const newSelectedEvent = eventDates.filter((i) => i.id == id)[0];
    setSelectedEvent(newSelectedEvent);
    setIsOverlayOpen(true);
  };

  return (
    <>
      <h1 className="center">Golden Feather Guest Signup</h1>
      <h2 className="center">Please select from the below available dates</h2>
      <p className="center">
        All times are set to your local timezone: {userTimezone}
      </p>

      <div className="event-card-container">
        {eventDates
          .filter((event) => event.isAvailable) //only shows available events to user
          .map((event) => (
            <EventCard
              key={event.id}
              data={event}
              selectEvent={changeSelectedEvent}
              timezone={userTimezone}
            />
          ))}
      </div>

      {selectedEvent && (
        <Overlay isOpen={isOverlayOpen} setIsOpen={setIsOverlayOpen}>
          <GuestForm event={selectedEvent} />
        </Overlay>
      )}
    </>
  );
};

export default App;
