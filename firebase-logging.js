#! /usr/bin/env node

'use strict';

const cmd = require("node-cmd");
const argv = require("yargs").argv;

let last = [];
const project = argv.project ? `--project ${argv.project}` : "";
const lines = argv.lines ? argv.lines : 100;

if (argv.h) {
  console.log(
    "Format: node firebase-logging.js --project=[projectId] --n=[number of lines]"
  );
  return;
}

const getLogs = () => {
  cmd.get(
    `firebase ${project} functions:log -n ${lines}`,
    (err, data, stderr) => {
      if (err) {
        console.error(err);
      }

      const splitData = data.trim().split("\n");
      const diff = splitData.filter((x) => !last.includes(x));

      if (diff.length > 0) {
        console.log(diff.join("\n"));
      }

      last = [...splitData];
    }
  );
};

getLogs();
setInterval(() => {
  getLogs();
}, 2000);
