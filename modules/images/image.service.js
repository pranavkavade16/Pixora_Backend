const cloudinary = require("../../utils/cloudinary");
const imageRepository = require("./image.repository");
const albumRepository = require("../albums/album.respository");

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
    name: 
    file.originalname,
    size: file.size,
    tags,
    person: body.person || null,
    isFavorite: body.isFavorite || false,
    comments: body.comments.text || null,
    updatedAt: new Date(),
  });
};
