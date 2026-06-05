const userRepository = require("./user.repository");

const createUser = async (data) => {
  const existingUser = await userRepository.findByEmails(data.email);

  if (existingUser) {
    throw new Error("User with this email address already exists");
  }

  const user = await userRepository.create(data);

  return user;
};
