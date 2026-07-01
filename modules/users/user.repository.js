const User = require("./user.model");

const create = async (data) => {
  return User.create(data);
};

const findByEmails = async (emails) => {
  return User.find({
    email: {
      $in: emails,
    },
  });
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getAllUsers = async () => {
  return User.find();
};

module.exports = {
  findByEmails,
  create,
  findUserByEmail,
  getAllUsers,
};
