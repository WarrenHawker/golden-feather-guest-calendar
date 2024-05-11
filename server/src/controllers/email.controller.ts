import validator from 'validator';
import { Request, Response } from 'express';
import { ErrorReturn } from '../types/error-return';
import {
  adminNotificationText,
  adminNotificationHtml,
} from '../templates/adminNotificationTemplate';
import {
  confirmEmailText,
  confirmEmailHtml,
} from '../templates/confirmEmailTemplate';
import { sendEmail } from '../services/email.service';
const { isEmail, isEmpty, isURL, escape, normalizeEmail } = validator;

export const sendEmailController = async (req: Request, res: Response) => {
  let { name, email, discord, twitter, youtube, twitch, event } = req.body;

  const missingParams = [];
  if (!name) {
    missingParams.push('name');
  }
  if (!email) {
    missingParams.push('email');
  }
  if (!discord) {
    missingParams.push('discord');
  }
  if (!event) {
    missingParams.push('event');
  }
  if (missingParams.length > 0) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Missing body parameters',
      params: missingParams,
    };
    res.status(400).json(error);
    return;
  }

  const emptyFields = [];
  if (isEmpty(name, { ignore_whitespace: true })) {
    emptyFields.push('name');
  }
  if (isEmpty(email, { ignore_whitespace: true })) {
    emptyFields.push('email');
  }
  if (isEmpty(discord, { ignore_whitespace: true })) {
    emptyFields.push('discord');
  }
  if (isEmpty(event, { ignore_whitespace: true })) {
    emptyFields.push('event');
  }
  if (emptyFields.length > 0) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Empty required fields',
      params: emptyFields,
    };
    res.status(400).json(error);
    return;
  }

  if (!isEmail(email)) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Invalid email',
      params: ['email'],
    };
    res.status(400).json(error);
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
    const error: ErrorReturn = {
      code: 400,
      message: 'Invalid social URL',
      params: invalidURLs,
    };
    res.status(400).json(error);
    return;
  }

  email = escape(email).trim();
  email = normalizeEmail(email, { gmail_remove_dots: false });

  const adminEmailOptions = {
    name: escape(name).trim(),
    email: email,
    discord: escape(discord).trim(),
    twitter,
    youtube,
    twitch,
    event: escape(event).trim(),
  };

  try {
    await sendEmail(
      email,
      'thank you for your message',
      confirmEmailText(name, event),
      confirmEmailHtml(name, event)
    );

    await sendEmail(
      process.env.SENDGRID_ADMIN!,
      'new form submission',
      adminNotificationText(adminEmailOptions),
      adminNotificationHtml(adminEmailOptions)
    );
    res.status(200);
  } catch (err) {
    const error: ErrorReturn = {
      code: 500,
      message: (err as Error).message,
    };
    res.status(500).json(error);
    return;
  }
};
