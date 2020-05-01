# firebase-logging

The CLI (command line interface) Firebase tools logging requires you to re-run to see new data...yuck!

The firebase-logging simulates real-time logging by continually running the Firebase CLI logging command and printing to the console new entires.

## Installation

`npm i -g firebase-logging`

## Requirements

- [firebase-tools](https://www.npmjs.com/package/firebase-tools) globally installed.
- A Firebase project id you want to see the logs of

## Usage

### Run

`firebase-tools --project=[Firebase projectId]`

### Options

- --help     help
- --n        number of lines to get at first run

### Run using the github code

`node firebase-tools.js --project=[Firebase projectId]`
