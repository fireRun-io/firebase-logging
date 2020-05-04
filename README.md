# firebase-logging

Firebase's CLI (command line interface) [logging](https://firebase.google.com/docs/functions/writing-and-viewing-logs) requires you to re-run to see new data. That becomes a lot of up 'arrow key' and 'enter' pressing.

**firebase-logging** gives you real-time logging by continually running the Firebase CLI logging command and printing to the console new entires. You can output the logs to the console and a file.

Log enhancements include:

- Colored Logs: *timestamp* blue, *function* name green, *warning* yellow, and *error* red.
- Locally Formatted Timestamp: format from UTC timestamp to your local time.

**Note:** The polling occurs every *2 seconds*, which is the maximum firebase-tools can handle. The default pull is 250 lines, so if you have more than 250 lines logs per seconds, some will be missed. Increase the number of log lines pulled with the `--n` parameter to capture more logs (1-1000).

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

| Parameter     | Description                               |
| ------------- |:-----------------------------------------:|
| --help        | Help info                                 |
| --file        | Name of the file to write the logs        |
| --colorOff    | Turn off coloring of logs                 |
| --func        | Name of specific function to view logs    |
| --n           | Number of log lines to pull (1-1000)      |
| --ft          | Format timestamp to local date and time   |

### Run using the github code

`node firebase-logging.js --project=[Firebase projectId]`
