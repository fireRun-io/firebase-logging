# firebase-logging

The CLI (command line interface) Firebase tools logging requires you to re-run to see new data...yuck!

The firebase-logging simulates real-time logging by continually running the Firebase CLI logging command and printing to the console new entires. You can output the logs to the console and a file.

## Installation

`npm i -g firebase-logging`

## Requirements

- [firebase-tools](https://www.npmjs.com/package/firebase-tools) globally installed.
- A Firebase project id you want to see the logs of

## Usage

### Run

`firebase-logging --project=[Firebase projectId]`

### Options

- --help     Help
- file       Name of the file to write the logs
- --n        number of lines to get at first run

### Run using the github code

`node firebase-logging.js --project=[Firebase projectId]`
