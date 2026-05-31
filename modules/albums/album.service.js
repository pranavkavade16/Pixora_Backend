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

module.exports = { createAlbum };
