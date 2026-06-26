const cloudinary = require("../../utils/cloudinary");
const imageRepository = require("./image.repository");
const albumRepository = require("../albums/album.respository");
const albumValidator = require("../albums/album.validator");

const uploadImage = async (albumId, userId, file, body) => {
  if (!file) {
    throw new Error("Image file is required");
  }

  const ablbum = await albumRepository.findAlbumById(albumId);

  if (!album) {
    throw new Error("Album not found");
  }

  const hasAccess =
    album.ownerId.toString() === userId ||
    album.sharedUsers.some((usersId) => usersId.toString() === userId);

  if (!hasAccess) {
    throw new Error("You do not have access to this album");
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
    folder: "pixora-pix",
  });

  let tags = [];

  if (body.tags) {
    try {
      tags = JSON.parse(body.tags);
    } catch {
      tags = [];
    }
  }

  const image = await imageRepository.upload({
    albumId,
    imageUrl: cloudinaryResponse.secure_url,
    name: file.originalname,
    size: file.size,
    tags,
    persons: body.person || null,
    isFavorite: body.isFavorite || false,
    comments: body.comments.text || null,
    updatedAt: new Date(),
  });
};

const favoriteImage = async (albumId, imageId, userId, isFavorite) => {
  const album = await albumRepository.findAlbumById(albumId);

  if (!album) {
    throw new Error("Album not found");
  }

  const hasAccess =
    album.ownerId.toString() === userId ||
    album.sharedWith.some((sharedUserId) => sharedUserId.toString() === userId);

  if (!hasAccess) {
    throw new Error("Access denied");
  }

  const image = await imageRepository.findById(imageId);

  if (!image) {
    throw new Error("Image not found");
  }

  if (image.albumId.toString() !== albumId) {
    throw new Error("Image does not belong to this album");
  }

  return imageRepository.updateFavoriteStatus(imageId, isFavorite);
};

const deleteImage = async (albumId, imageId, userId) => {
  const album = await albumRepository.findAlbumById(albumId);

  if (!album) {
    throw new Error("Album not found");
  }

  albumValidator.validateAlbumAccess(albumId, userId);

  const image = await imageRepository.findById(imageId);

  if (!image) {
    throw new Error("Image not found");
  }

  if (image.albumId.toString() !== albumId) {
    throw new Error("Image does not belong to this album");
  }

  return imageRepository.deleteImage(imageId);
};

const getImagesByAlbum = async (albumId) => {
  const album = await albumRepository.findAlbumById(albumId);

  if (!album) {
    throw new Error("Album not found");
  }

  return await imageRepository.getImagesByAlbum(albumId);
};

module.exports = { uploadImage, favoriteImage, deleteImage, getImagesByAlbum };
