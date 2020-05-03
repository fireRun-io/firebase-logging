#! /usr/bin/env node

"use strict";

const cmd = require("node-cmd");
const fs = require("fs");
const argv = require("yargs").argv;

let last = [];
let stream;
const project = argv.project ? `--project ${argv.project}` : "";
const only = argv.function ? `--only ${argv.function}` : "";
const lines = argv.lines ? argv.lines : 250;

if (argv.h) {
  console.log(
    "Usage: firebase-logging --project=[projectId] --n=[number of lines] --file=[File Name: File to write logs] --function=[Function Name: View specific function logs]"
  );

  process.exit();
}

console.log("Starting firebase-logging...");

if (argv.file) {
  stream = fs.createWriteStream(argv.file, { flags: "a" });
}

const getLogs = () => {
  cmd.get(
    `firebase ${project} functions:log -n ${lines} ${only}`,
    (err, data, stderr) => {
      if (err) {
        console.error(err);
      }

      const splitData = data.trim().split("\n");
      const diff = splitData.filter((x) => !last.includes(x));

      if (diff.length > 0) {
        const strLogs = diff.join("\n");
        console.log(strLogs);

        argv.file && stream.write(strLogs);
      }

      last = [...splitData];
    }
  );
};

getLogs();
setInterval(() => {
  getLogs();
}, 2000);

process.on("SIGINT", () => {
  console.log("\nStopping firebase-logging");

  argv.file && stream.end();
  process.exit();
});
