export type AdminEmailOptions = {
  name: string;
  email: string;
  discord: string;
  twitter: string;
  youtube: string;
  twitch: string;
  event: string | Date;
};

export const adminNotificationText = (options: AdminEmailOptions) => {
  return `A new Golden Feather guest form has just been submitted. Here are the details:
    event: ${options.event}
    name: ${options.name}
    email: ${options.email}
    discord: ${options.discord}
    twitter: ${options.twitter}
    youtube: ${options.youtube}
    twitch: ${options.twitch}
  `;
};

export const adminNotificationHtml = (options: AdminEmailOptions) => {
  return `A new Golden Feather guest form has just been submitted. Here are the details:
  event: ${options.event}
  name: ${options.name}
  email: ${options.email}
  discord: ${options.discord}
  twitter: ${options.twitter}
  youtube: ${options.youtube}
  twitch: ${options.twitch}
  `;
};
