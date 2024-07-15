const fs = require("node:fs");
const InternalError = require("../domain/errors/InternalError");

const readFile = (path) => {
  try {
    const result = fs.readFileSync(path, "utf8");
    return JSON.parse(result);
  } catch (error) {
    console.error("Error on reading JSON file Users", error);
    throw new InternalError(error.message);
  }
};

module.exports = readFile;
