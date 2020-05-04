#! /usr/bin/env node

const cmd = require("node-cmd");
const fs = require("fs");
const argv = require("yargs").argv;
const { formatDate } = require("./utils/date");
const { colorMe } = require("./utils/color");

let last = [];
let stream;
const project = argv.project ? `--project ${argv.project}` : "";
const only = argv.function ? `--only ${argv.func}` : "";
const lines = argv.n ? argv.n : 250;

if (argv.h) {
  console.log(
    "Usage: firebase-logging --project=[projectId] --n=[number of lines] --file=[File Name: File to write logs] --func=[Function Name: View specific function logs] --colorOff --ft"
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
      let diff = splitData.filter((x) => !last.includes(x));

      if (diff.length > 0) {
        if (!argv.colorOff || argv.ft) {
          diff = diff.map((x) => {
            let logArr = x.split(" ");

            // Format time
            if (argv.ft) {
              logArr[0] = formatDate(logArr[0]);
            }

             // Add some color
            if (!argv.colorOff) {
              logArr = colorMe(logArr);
            }

            return logArr.join(' ');
          });
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
