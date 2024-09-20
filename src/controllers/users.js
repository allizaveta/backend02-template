const User = require("../models/user");

const getMain = (request, response) => {
  response.send("Hello,world");
};
// Получим всех пользователей из БД
const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

// Получим пользователя по ID
const getUser = (req, res) => {
  const { user_id } = req.params;
  User.findById(user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("user not found");
      } else {
        res.status(200).send(user);
      }
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

// Создаем пользователя
const createUser = (req, res) => {
  const data = req.body;
  User.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

//Изменяем пользователя
const updateUser = (req, res) => {
  const { user_id } = req.params;
  User.findByIdAndUpdate(user_id, { ...req.body })
    .then((user) => {
      if (!user) {
        return res.status(404).send("user not found");
      } else {
        res.status(200).send(user);
      }
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

//Удаление пользователя
const deleteUser = (req, res) => {
  const { user_id } = req.params;
  User.findByIdAndDelete(user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("user not found");
      } else {
        res.status(200).send("Success");
      }
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

module.exports = {
  getMain,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};