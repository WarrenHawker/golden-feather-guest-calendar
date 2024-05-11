import { SyntheticEvent, useState } from 'react';
import { EventData } from '../../data';
import { formatDate } from '../../functions/formatDate';
import { sendEmail } from '../../functions/sendEmail';
import validator from 'validator';
import {
  confirmEmailHtml,
  confirmEmailText,
} from '../../templates/confirmEmailTemplate';
import {
  AdminEmailOptions,
  adminNotificationHtml,
  adminNotificationText,
} from '../../templates/adminNotificationTemplate';

const { isEmail, isEmpty, isURL, escape, normalizeEmail } = validator;

type Props = {
  event: EventData;
};

const GuestForm = ({ event }: Props) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [discord, setDiscord] = useState('');
  const [twitter, setTwitter] = useState('');
  const [youtube, setYoutube] = useState('');
  const [twitch, setTwitch] = useState('');
  const [error, setError] = useState('');
  const [invalidInputs, setInvalidInputs] = useState<string[]>([]);

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();

    //check for missing required fields
    const missingFields = [];

    if (isEmpty(name, { ignore_whitespace: true })) {
      missingFields.push('name');
    }

    if (isEmpty(email, { ignore_whitespace: true })) {
      missingFields.push('email');
    }

    if (isEmpty(discord, { ignore_whitespace: true })) {
      missingFields.push('discord');
    }

    if (missingFields.length > 0) {
      setError('please fill in all required fields');
      setInvalidInputs(missingFields);
      return;
    }

    if (!isEmail(email)) {
      setError('please give a valid email address');
      setInvalidInputs(['email']);
      return;
    }

    const invalidURLs = [];
    if (!isEmpty(twitter)) {
      if (!isURL(twitter)) {
        invalidURLs.push('twitter');
      }
    }

    if (!isEmpty(youtube)) {
      if (!isURL(youtube)) {
        invalidURLs.push('youtube');
      }
    }

    if (!isEmpty(twitch)) {
      if (!isURL(twitch)) {
        invalidURLs.push('twitch');
      }
    }

    if (invalidURLs.length > 0) {
      setError('social links need to be a valid profile URL');
      setInvalidInputs(invalidURLs);
      return;
    }

    //send confirmation to guest
    sendEmail(
      email,
      'thank you for your message',
      confirmEmailText(name, event.dateTime),
      confirmEmailHtml(name, event.dateTime)
    );

    let sanitisedEmail = escape(email).trim();
    sanitisedEmail = normalizeEmail(sanitisedEmail, {
      gmail_remove_dots: false,
    }) as string;

    //send notification to admin
    const adminEmailOptions: AdminEmailOptions = {
      name: escape(name).trim(),
      email: sanitisedEmail,
      discord: escape(discord).trim(),
      twitter,
      youtube,
      twitch,
      event: event.dateTime,
    };

    sendEmail(
      import.meta.env.VITE_SENDGRID_ADMIN,
      'new form submission',
      adminNotificationText(adminEmailOptions),
      adminNotificationHtml(adminEmailOptions)
    );

    setIsFormSubmitted(true);
    setName('');
    setEmail('');
    setDiscord('');
    setTwitter('');
    setYoutube('');
    setTwitch('');
    setError('');
    setInvalidInputs([]);
  };
  return (
    <>
      {isFormSubmitted ? (
        <>
          <h2 className="center">
            Thank you for your submission. We will contact you by email soon.
          </h2>
          <p className="center">
            In the meantime please join our{' '}
            <a href="https://discord.gg/tgftavern" target="_blank">
              discord server
            </a>
          </p>
        </>
      ) : (
        <>
          <h2>
            Please fill in the form below to book for event on:{' '}
            {formatDate(event.dateTime)}
          </h2>
          <form>
            <label htmlFor="name">Name (required)</label>
            <input
              className={invalidInputs.includes('name') ? 'invalid' : ''}
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email (required)</label>
            <input
              className={invalidInputs.includes('email') ? 'invalid' : ''}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="discord">Discord Username (required)</label>
            <input
              className={invalidInputs.includes('discord') ? 'invalid' : ''}
              type="text"
              name="discord"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
            />

            <label htmlFor="twitter">Twitter/X profile URL</label>
            <input
              className={invalidInputs.includes('twitter') ? 'invalid' : ''}
              type="text"
              name="twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />

            <label htmlFor="youtube">Youtube channel URL</label>
            <input
              className={invalidInputs.includes('youtube') ? 'invalid' : ''}
              type="text"
              name="youtube"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
            />

            <label htmlFor="twitch">Twitch channel URL</label>
            <input
              className={invalidInputs.includes('twitch') ? 'invalid' : ''}
              type="text"
              name="twitch"
              value={twitch}
              onChange={(e) => setTwitch(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button onClick={(e) => submitForm(e)}>Submit</button>
          </form>
        </>
      )}
    </>
  );
};

export default GuestForm;
