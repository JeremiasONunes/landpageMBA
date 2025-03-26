const path = require("path");

const getFilePath = () => {
  return path.join(__dirname, "../files/Hello.txt"); 
};

module.exports = { getFilePath };