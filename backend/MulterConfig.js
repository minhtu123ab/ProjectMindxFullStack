import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryConfig from "./CloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: "movie_posters",
    allowed_formats: ["jpg", "png"],
  },
});

const upload = multer({ storage });

export default upload;
