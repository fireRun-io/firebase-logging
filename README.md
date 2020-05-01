# firebase-logging

The CLI (command line interface) Firebase tools logging requires you to re-run to see new data...yuck! 

The firebase-logging simulates real-time logging by continually running the Firebase CLI logging command and printing to the console new entires.

## Requirements

- NodeJS installed
- [firebase-tools](https://www.npmjs.com/package/firebase-tools) installed.
- A Firebase project you want to see the logs of

## Usage

`node firebase-tools.js --project=[Firebase projectId]`

### Options

--help     help
--n        number of lines to get at first run