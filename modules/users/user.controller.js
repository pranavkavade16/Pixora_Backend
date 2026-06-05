const userService = require("./user.service");

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
