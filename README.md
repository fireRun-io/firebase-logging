# firebase-logging

Firebase's CLI (command line interface) [logging](https://firebase.google.com/docs/functions/writing-and-viewing-logs) requires you to re-run to see new data. That becomes a lot of up 'arrow key' and 'enter' pressing.

**firebase-logging** gives you real-time logging by continually running the Firebase CLI logging command and printing to the console new entires. You can output the logs to the console and a file.

**Note:** The polling occurs every 2 seconds (the max firebase-tools can handle). The default pull is 250 lines, so if you have more than 250 lines logs per seconds, some will be missed. Increase the number of log lines pulled with the `--n` parameter to capture more logs.

## Installation

`npm i -g firebase-logging`

## Requirements

- [firebase-tools](https://www.npmjs.com/package/firebase-tools) globally installed.
- A Firebase project id you want to see the logs of

## Usage

### Run

`firebase-logging --project=[Firebase projectId]`

### Example

Start the logging to the console for project myFirerun, only for the sendReport function, and save to the savelog.txt file.

`firebase-logging --project=myFirerun --function=sendReport --file=savelog.txt`

### Options

- --help       Help
- --file       Name of the file to write the logs
- --function   Name of specific function to view logs
- --n          Number of log lines to pull

### Run using the github code

`node firebase-logging.js --project=[Firebase projectId]`
