#! /usr/bin/env node

const cmd = require("node-cmd");
const fs = require("fs");
const argv = require("yargs").argv;
const { formatDate } = require("./utils/date");
const { colorMe } = require("./utils/color");

const SCHEDULE = 2000;        // milliseconds
const DEFAULT_LINES = 250;    // lines to poll

let last = [];
let stream;
const project = argv.project ? `--project ${argv.project}` : "";
const only = argv.function ? `--only ${argv.func}` : "";
const lines = argv.n ? argv.n : DEFAULT_LINES;
const freq = !isNaN(argv.freq) ? parseInt(argv.freq) : SCHEDULE;

if (argv.h || argv.help) {
  console.log(
    "Usage: firebase-logging\n\nRequired:\n--project=[projectId] : Firebase Project Id\n\nOptional:\n--n=[number] : Number of log line to poll, default 250\n--file=[File Name] : File to write logs\n--func=[Function Name] : View specific function logs\n--colorOff : Turn off coloring of logs\n--ft : Format timestamp to local\n--freq=[milliseconds] : polling frequency, default 2000"
  );

  process.exit();
}

if (freq < 1500) {
  console.error("Minimum frequency is 1500 milliseconds.");
  process.exit();
} else {
  console.log(
    `Starting firebase-logging, query every ${freq} milliseconds ...`
  );
}

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

            return logArr.join(" ");
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
}, freq);

process.on("SIGINT", () => {
  console.log("\nStopping firebase-logging");

  argv.file && stream.end();
  process.exit();
});
