const albumRepository = require("./album.respository");
const userRepository = require("../users/user.repository");

const createAlbum = async (data, userId) => {
  const existingAlbum = await albumRepository.findByNameAndOwner(
    data.name,
    userId,
  );

  if (existingAlbum) {
    throw new Error("Album already exists");
  }

  const album = await albumRepository.create({
    ...data,
    ownerId: userId,
    sharedUsers: [],
  });

  return album;
};

const updateAlbum = async (albumId, userId, description) => {
  const album = await albumRepository.findById(albumId);

  if (!album) {
    throw new Error("Album not found");
  }

  if (album.ownerId.toString() !== userId) {
    throw new Error("You are not authorized to update this album");
  }

  return await albumRepository.updateDescription(albumId, description);
};

const shareAlbum = async (albumId, userId, emails) => {
  const album = await albumRepository.findById(albumId);

  if (!album) {
    throw new Error("Album not found");
  }

  if (album.ownerId.toString() !== userId) {
    throw new Error("Only the owner can share this album");
  }

  const users = await userRepository.findByEmails(emails);

  if (users.length !== emails.length) {
    throw new Error("One or more users do not exist");
  }

  const userIds = users.map((user) => user._id);

  return await albumRepository.addSharedUsers(albumId, userIds);
};

module.exports = { createAlbum, updateAlbum, shareAlbum };
