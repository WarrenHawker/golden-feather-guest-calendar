/* 
  convertTimezone function

  Global function that changes a UTC Date or dateTime string 
  to a new dateTime string based the user's timezone.
*/

export const convertTimezone = (
  dateTimeString: string | Date,
  targetTimezone: string
) => {
  const dateTime = new Date(dateTimeString);

  const options = {
    timeZone: targetTimezone,
  };
  return dateTime.toLocaleString('en-US', options);
};
