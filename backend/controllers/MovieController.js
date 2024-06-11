import MovieModel from "../models/MovieModel.js";
import upload from "../MulterConfig.js";

const MovieController = {
  GetAll: async (req, res) => {
    try {
      const data = await MovieModel.find();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  DeleteMovie: async (req, res) => {
    try {
      const { id } = req.params;
      await MovieModel.findByIdAndDelete(id);
      res.status(200).send({
        message: "Deleted successfully",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  PushMovie: [
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "background", maxCount: 1 },
    ]),
    async (req, res) => {
      try {
        const {
          movieName,
          description,
          time,
          nation,
          releaseDate,
          count,
          category,
          video,
          comment,
          script,
          director,
          rankMovie,
        } = req.body;

        // Truy cập các tệp tin đã upload
        const image = req.files["image"] ? req.files["image"][0].path : "";
        const background = req.files["background"]
          ? req.files["background"][0].path
          : "";

        // Tạo đối tượng phim mới
        const newMovie = new MovieModel({
          movieName,
          description,
          time,
          nation,
          releaseDate,
          count,
          category,
          video,
          comment,
          script,
          director,
          rankMovie,
          image,
          background,
        });

        // Lưu phim mới vào cơ sở dữ liệu
        await newMovie.save();

        res.status(201).send({
          message: "Movie added successfully",
          movie: newMovie,
        });
      } catch (err) {
        res.status(500).send({
          message: err.message,
        });
      }
    },
  ],

  PushComment: async (req, res) => {
    try {
      const { comment } = req.body;
      const { id } = req.params;
      await MovieModel.findByIdAndUpdate(id, { $set: { comment: comment } });
      res.status(200).send({
        message: "Success",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  UpdateCount: async (req, res) => {
    try {
      const { id } = req.params;
      const { count } = req.body;
      await MovieModel.findByIdAndUpdate(id, { count: count });
      res.status(200).send({
        message: "Success",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

export default MovieController;
