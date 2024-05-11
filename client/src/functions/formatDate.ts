// Function to get ordinal suffix for the day of the month (e.g., 1st, 2nd, 3rd, etc.)
const getOrdinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const formatDate = (dateInput: string | Date): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = date.getDay();
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const weekday = weekdays[dayOfWeek];

  // Get the day of the month (1-31)
  const dayOfMonth = date.getDate();

  // Get the month (0-11)
  const month = date.toLocaleString('en-US', { month: 'long' });

  // Get the hours (0-23)
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // 12-hour clock format

  // Format the string
  const formattedDate = `${hours}${ampm} ${weekday} ${dayOfMonth}${getOrdinalSuffix(
    dayOfMonth
  )} ${month}`;
  return formattedDate;
};
