const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const FILE_PATH = "./data.json";

const makeCommit = async (n) => {
  if (n === 0) {
    await simpleGit().push();
    console.log("All commits pushed to remote!");
    return;
  }

  const x = Math.floor(Math.random() * 55); // Weeks
  const y = Math.floor(Math.random() * 7);  // Days
  const DATE = moment()
    .subtract(1, "y")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { n };

  console.log(`Commit #${n} on date: ${DATE}`);

  try {
    await jsonfile.writeFile(FILE_PATH, data);
    await simpleGit().add(FILE_PATH).commit(DATE, { "--date": DATE });
    makeCommit(n - 1);
  } catch (err) {
    console.error("Error during commit process:", err);
  }
};

makeCommit(500);
