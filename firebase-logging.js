#! /usr/bin/env node

"use strict";

const cmd = require("node-cmd");
const fs = require("fs");
const argv = require("yargs").argv;
const chalk = require("chalk");

let last = [];
let stream;
const project = argv.project ? `--project ${argv.project}` : "";
const only = argv.function ? `--only ${argv.func}` : "";
const lines = argv.n ? argv.n : 250;

if (argv.h) {
  console.log(
    "Usage: firebase-logging --project=[projectId] --n=[number of lines] --file=[File Name: File to write logs] --func=[Function Name: View specific function logs] --color=off"
  );

  process.exit();
}

console.log("Starting firebase-logging...");

if (argv.file) {
  stream = fs.createWriteStream(argv.file, { flags: "a" });
}

const colorMe = (arr) => {
  const copyArr = [...arr];

  const colored = copyArr.map((x) => {
    const logArr = x.split(" ");
    logArr[0] = chalk.blue(logArr[0]);
    logArr[1] = logArr[1] === 'E' ? chalk.red.bold(logArr[1]) : logArr[1];
    logArr[2] = chalk.green(logArr[2]);

    const coloredLogs = logArr.map((y) => {
      const lower = y.toLowerCase();
      if (lower.includes("error")) {
        y = chalk.red.bold(y);
      } else if (lower.includes("warning")) {
        y = chalk.yellow.bold(y);
      }

      return y;
    });

    return coloredLogs.join(" ");
  });

  return colored;
};

const getLogs = () => {
  cmd.get(
    `firebase ${project} functions:log -n ${lines} ${only}`,
    (err, data, stderr) => {
      if (err) {
        console.error(err);
      }

      const splitData = data.trim().split("\n");
      let diff = splitData.filter((x) => !last.includes(x));

      if (diff.length > 0) {
        // Add some color
        if(argv.color !== 'off') {
          diff = colorMe(diff);
        }

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
