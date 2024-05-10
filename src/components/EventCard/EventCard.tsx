import { useEffect, useState } from 'react';
import { EventData } from '../../data';
import { formatDate } from '../../functions/formatDate';
import { convertTimezone } from '../../functions/convertTimezone';

type Props = {
  data: EventData;
  selectEvent: (id: string) => void;
  timezone: string;
};

const EventCard = ({ data, selectEvent, timezone }: Props) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    if (!timezone) {
      setCurrentTime(
        new Date(data.dateTime).toLocaleString('en-US', { timeZone: 'UTC' })
      );
    } else {
      setCurrentTime(convertTimezone(data.dateTime, timezone));
    }
  }, [timezone]);

  return (
    <div className="event-card" onClick={() => selectEvent(data.id)}>
      <h2>{formatDate(currentTime)}</h2>
    </div>
  );
};

export default EventCard;
