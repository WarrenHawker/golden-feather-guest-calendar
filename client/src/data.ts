/* 
  Data.ts file

  Contains placeholder/test data for the events, along with the EventData type. 
  Currently imported directly into the App.tsx file 

  The dateTime property should be set to UCT
*/

export type EventData = {
  id: string;
  dateTime: string;
  isAvailable: boolean;
};

const eventDates: EventData[] = [
  {
    id: 'ljv7nflex',
    dateTime: '2024-05-03T23:00Z',
    isAvailable: true,
  },
  {
    id: '307l700eb',
    dateTime: '2024-05-10T22:00Z',
    isAvailable: true,
  },
  {
    id: 'g23k0cc9r',
    dateTime: '2024-05-17T19:00Z',
    isAvailable: true,
  },
  {
    id: '4k6jhn2yh',
    dateTime: '2024-05-24T19:00Z',
    isAvailable: true,
  },
  {
    id: '1pixrgkvc',
    dateTime: '2024-05-31T19:00Z',
    isAvailable: true,
  },
];

export default eventDates;
