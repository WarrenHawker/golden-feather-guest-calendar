export const convertTimezone = (
  dateTimeString: string | Date,
  targetTimezone: string
) => {
  const dateTime = new Date(dateTimeString);

  const options = {
    timeZone: targetTimezone,
  };

  return new Intl.DateTimeFormat('en-US', options).format(dateTime);
};
