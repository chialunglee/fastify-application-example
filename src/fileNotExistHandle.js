const fs = require('fs');

const fileNotExistHandle = (targetFilePath, initJSONData) => {
  const isUserExist = fs.existsSync(targetFilePath);
  if (!isUserExist) {
    fs.writeFileSync(targetFilePath, JSON.stringify(initJSONData, null, 2));
  }

  return true;
};

module.exports = {
  fileNotExistHandle,
};
