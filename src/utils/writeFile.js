const InternalError = require("../domain/errors/InternalError");
const fs = require("fs");

const writeFile = (path, values) => {
  try {
    const content = JSON.stringify(values, null, 4);
    fs.writeFileSync(path, content, "utf8");
  } catch (error) {
    console.error("Error on writing JSON file Users", error);
    throw new InternalError(error.message);
  }
};

module.exports = writeFile;
