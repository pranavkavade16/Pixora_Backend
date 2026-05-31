const Album = require("./album.model");

const create = async (data) => {
  return Album.create(data);
};

const findByNameAndOwner = async (name, ownerId) => {
  return Album.findOne({ name, ownerId });
};

module.exports = { create, findByNameAndOwner };
