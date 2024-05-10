export type EventData = {
  id: string | number;
  dateTime: Date | string;
  isAvailable: boolean;
};

const eventDates: EventData[] = [
  {
    id: 'ljv7nflex',
    dateTime: '2024-05-03T19:00',
    isAvailable: true,
  },
  {
    id: '307l700eb',
    dateTime: '2024-05-10T19:00',
    isAvailable: true,
  },
  {
    id: 'g23k0cc9r',
    dateTime: '2024-05-17T19:00',
    isAvailable: true,
  },
  {
    id: '4k6jhn2yh',
    dateTime: '2024-05-24T19:00',
    isAvailable: true,
  },
  {
    id: '1pixrgkvc',
    dateTime: '2024-05-31T19:00',
    isAvailable: true,
  },
];

export default eventDates;
