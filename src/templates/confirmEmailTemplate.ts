import { formatDate } from '../functions/formatDate';

export const confirmEmailText = (name: string, event: string | Date) => {
  return `Hi ${name}. Thank you for your request to be a guest on our Golden Feather event on: ${formatDate(
    event
  )}. 
  We will review all the information and get back to you soon.   
  `;
};

export const confirmEmailHtml = (name: string, event: string | Date) => {
  return `Hi ${name}. Thank you for your request to be a guest on our Golden Feather event on: ${formatDate(
    event
  )}. 
  We will review all the information and get back to you soon. `;
};
