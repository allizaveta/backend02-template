const fs = require('fs');
const path = require('path');

const getUsers = (callback) => {
  const filePath = path.join(__dirname, "../data/users.json");

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      try {
        const users = JSON.parse(data);
        callback(null, users);
      } catch (parseError) {
        callback(parseError);
      }
    }
  });
};

module.exports = { getUsers };
