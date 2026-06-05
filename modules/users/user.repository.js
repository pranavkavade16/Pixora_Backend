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

module.exports = {
  findByEmails,
  create,
};
