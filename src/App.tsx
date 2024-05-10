import { useState } from 'react';
import EventCard from './components/EventCard/EventCard';
import eventDates from './data';

const App = () => {
  const [test, setTest] = useState('');
  console.log(test);
  return (
    <>
      <h1>Golden Feather Guest Signup</h1>
      <h2>Please select from the below available dates</h2>

      {eventDates
        .filter((event) => event.isAvailable)
        .map((event) => (
          <EventCard key={event.id} data={event} />
        ))}

      <input
        type="datetime-local"
        value={test}
        onChange={(e) => setTest(e.target.value)}
      />
    </>
  );
};

export default App;
