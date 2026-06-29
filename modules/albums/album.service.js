const albumRepository = require("./album.respository");
const userRepository = require("../users/user.repository");
const mongoose = require("mongoose");
const Album = require("./album.model");

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

const getAllAlbums = async (userId) => {
  return albumRepository.findAllAlbumsByUser(userId);
};

const getAlbumById = async (albumId) => {
  return albumRepository.findAlbumById(albumId);
};

const deleteAlbum = async (albumId, userId) => {
  const album = await albumRepository.findAlbumById(albumId);

  if (!album) {
    throw new Error("Album not found");
  }

  if (album.ownerId.toString() !== userId) {
    throw new Error("Only the owner can delete this album");
  }

  return albumRepository.deleteAlbum(albumId);
};

const getLibrary = async (userId) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  return await Album.aggregate([
    {
      $match: {
        $or: [{ ownerId: objectId }, { sharedUsers: objectId }],
      },
    },

    {
      $lookup: {
        from: "images",
        let: {
          albumObjectId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$albumId", "$$albumObjectId"],
              },
            },
          },

          {
            $project: {
              _id: 0,
              imageId: 1,
              imageUrl: 1,
            },
          },

          {
            $limit: 4,
          },
        ],
        as: "previewImages",
      },
    },

    {
      $lookup: {
        from: "images",
        let: {
          albumObjectId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$albumId", "$$albumObjectId"],
              },
            },
          },

          {
            $count: "count",
          },
        ],
        as: "imageCount",
      },
    },

    {
      $addFields: {
        imageCount: {
          $ifNull: [
            {
              $arrayElemAt: ["$imageCount.count", 0],
            },
            0,
          ],
        },

        isOwner: {
          $eq: ["$ownerId", objectId],
        },
      },
    },

    {
      $project: {
        _id: 1,
        albumId: 1,
        name: 1,
        description: 1,
        createdAt: 1,
        updatedAt: 1,
        imageCount: 1,
        previewImages: 1,
        isOwner: 1,
      },
    },

    {
      $sort: {
        updatedAt: -1,
      },
    },
  ]);
};

module.exports = {
  createAlbum,
  updateAlbum,
  shareAlbum,
  getAllAlbums,
  getAlbumById,
  getLibrary,
};
