# Golden Feather Guest Calendar

> frontend client for the Golden Feather Guest Calendar, built with React and Typescript

## Description

This React/Typescript app can either be deployed on it's own or in tandem with the backend server that is attached to the repo. The app is built using Vite.

## Requirements

- Node v18
- npm v9

## Folder Structure

Below is an outline of the main folder and files within the project

```
/client/                  # root directory
├── dist/                 # Production ready JS and CSS files
├── node_modules/         # code for all third-party packages and React/Vite
├── src/
│ ├── assets              # Custom fonts and images and icons
│ ├── components
│ │ ├── EventCard         # Event card component
│ │ ├── GuestForm         # Guest contact form component
│ │ ├── Overlay           # Overlay component
│ ├── functions           # Globally used functions
  └── app.tsx             # Parent component - wraps all other components
  └── data.ts             # Placeholder events data for testing
  └── index.css           # Globally used CSS
  └── main.tsx            # React entrypoint
└── index.html            # Main html file, contains fontawesome script
```

## Installation

Follow the steps below to run the app locally:

1. Run the command `git clone https://github.com/WarrenHawker/golden-feather-guest-calendar` to clone the repo.
2. Open the project folder and run the command `cd client` to move to the client directory.
3. Run the command `npm install` to install all dependencies
4. Run the command `npm run dev` to start the development server on http://localhost:5173 in the web browser

## Build to production

The app uses Typescript which needs to be compiled before being deployed. This is done through Vite. To create a production-ready set of Javascript and CSS files, run the `npm run build` command. This creates a `dist` directory containing all the Javascript, CSS and assets for the app. This can be deployed directly to the web server of your choice.

## Placeholder event data

Placeholder event data is located in /src/data.ts and can be configued however you like. Data is stored as an array of objects as defined by the EventData type at the top of the file.

Set the dateTime property of the events to the desired time based on **UTC timezone** - This will then be converted to the user's local timezone based on their IP address.

To create a dateTime string based on UTC timezone, use the following format:
`yyyy-mm-ddThh:mmZ` For example, 7pm on 3rd May 2024 UTC will be written as "2024-05-03T19:00Z".
