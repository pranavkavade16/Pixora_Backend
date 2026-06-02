const albumRepository = require("./album.respository");

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

module.exports = { createAlbum };
