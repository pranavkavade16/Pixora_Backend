const userService = require("./user.service");

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};
