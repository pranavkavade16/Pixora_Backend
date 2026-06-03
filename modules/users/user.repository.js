const User =
  require("./user.model");

const findByEmails = async (
  emails
) => {
  return User.find({
    email: {
      $in: emails,
    },
  });
};

module.exports = {
  findByEmails,
};