![alt Firebase Logging Logo][logo]

[logo]: https://firerun.io/wp-content/uploads/2020/05/logging-logo-full.png

# Easier Logging for Firebase

Firebase Logging is a free open source tool that we built for the Firebase community. We are regular user of Firebase and this solves a real "logging" need for us. We hope it helps you too.

See the [Firebase Logging Homepage](https://firerun.io/firebase-logging/) for more information.

## Why Firebase Logging

Firebase's CLI (command line interface) [logging](https://firebase.google.com/docs/functions/writing-and-viewing-logs) requires you to re-run the tool just to see new data. That becomes a lot of up 'arrow key' and 'enter' pressing.

**Firebase Logging** gives you real-time logging by continually running the Firebase CLI logging command and printing to the console new entires. You can output the logs to the console and a file.

Log enhancements include:

- Colored Logs: *timestamp* blue, *function* name green, *warning* yellow, and *error* red. Default.
- Locally Formatted Timestamp: format from UTC timestamp to your local time. Use `--ft` parameter to format.

### Things to Note

The default polling occurs every *2 seconds*. You can set the frequency of polling with the `-freq` parameter from a minimum of 1500 milliseconds, which is the most Firebase will allow, to an infinite maximum. You might want to increase the frequency if you find the polling is taking too much system resources.

The default pull is 250 lines, so if you have more than 250 lines logs per the *polling frequency*, some logs will be missed. Increase the number of log lines pulled with the `--n` parameter to capture more logs (1-1000).

## Installation

`npm i -g firebase-logging`

## Requirements

- [firebase-tools](https://www.npmjs.com/package/firebase-tools) globally installed.
- A Firebase project id you want to see the logs of

## Usage

### Run

`firebase-logging --project=[Firebase projectId]`

### Example

Start the logging to the console for project myFirerun, only for the sendReport function, save to the savelog.txt file, and format the time to local.

`firebase-logging --project=myFirerun --func=sendReport --file=savelog.txt --ft`

### Options

| Parameter     | Description                                       |
| ------------- |:-------------------------------------------------:|
| --help        | Help info                                         |
| --file        | [File Name] to write the logs                     |
| --colorOff    | Turn off coloring of logs                         |
| --func        | [Function Name] of specific function to view logs |
| --n           | [Number] of log lines to pull (1-1000)            |
| --ft          | Format timestamp to local date and time           |
| --freq        | [Milliseconds] to poll for new logs               |
