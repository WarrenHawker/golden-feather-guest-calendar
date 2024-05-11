/*
  "send email" funtion

  Uses sendgrid to send email to specified target address.
  For more information, go to https://docs.sendgrid.com/
*/

//import packages
import sgMail from '@sendgrid/mail';

export const sendEmail = async (
  recipient: string,
  subject: string,
  text: string,
  html: string
) => {
  //validates environment variables from .env file
  const apiKey = import.meta.env.VITE_SENDGRID_API_KEY;
  const fromAddress = import.meta.env.VITE_SENDGRID_SENDER;
  if (!apiKey) {
    throw new Error('valid API key not found');
  }
  if (!fromAddress) {
    throw new Error('invalid fromAddress');
  }
  sgMail.setApiKey(apiKey);

  //email details
  const email = {
    to: recipient,
    from: fromAddress,
    subject: subject,
    text: text,
    html: html,
  };
  try {
    await sgMail.send(email);
    return email;
  } catch (error) {
    throw new Error(error as string);
  }
};
