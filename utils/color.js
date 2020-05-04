const chalk = require("chalk");

const colorMe = (logArr) => {
  logArr[0] = chalk.blue(logArr[0]);
  logArr[1] = logArr[1] === "E" ? chalk.red.bold(logArr[1]) : logArr[1];
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

  return coloredLogs;
};

exports.colorMe = colorMe;
