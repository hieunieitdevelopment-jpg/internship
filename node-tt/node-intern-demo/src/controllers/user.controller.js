const service = require("../services/user.service");

exports.getUsers = (req, res) => {
  const users = service.getUsers();
  res.json(users);
};
