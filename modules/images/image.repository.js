const Image = require("./image.model");

const upload = async (imageData) => {
  return await Image.create(imageData);
};
