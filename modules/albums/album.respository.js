const Album = require("./album.model");

const create = async (data) => {
  return Album.create(data);
};

const findByNameAndOwner = async (name, ownerId) => {
  return Album.findOne({ name, ownerId });
};

const findAlbumById = async (albumId) => {
  return Album.findOne({ albumId });
};

const updateDescription = async (description, albumId) => {
  return Album.findByIdAndUpdate(albumId, { description }, { new: true });
};

const addSharedUsers = async (albumId, userIds) => {
  return Album.findByIdAndUpdate(
    albumId,
    {
      $addToSet: {
        sharedWith: {
          $each: userIds,
        },
      },
    },
    {
      new: true,
    },
  );
};

module.exports = {
  create,
  findByNameAndOwner,
  findAlbumById,
  updateDescription,
  addSharedUsers,
};
