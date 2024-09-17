const fs = require('fs');
const path = require('path');

const getUsers = (callback) => {
  const filePath = path.join(__dirname, "../data/users.json");

  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports = { getUsers };