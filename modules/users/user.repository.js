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

module.exports = {
  findByEmails,
  create,
  findUserByEmail,
};
