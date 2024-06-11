import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  movieName: String,
  description: String,
  image: String,
  background: String,
  episode: String,
  time: String,
  nation: String,
  releaseDate: String,
  director: String,
  rankMovie: String,
  script: String,
  count: Number,
  category: String,
  video: String,
  comment: [
    {
      id: Number,
      name: String,
      content: String,
    },
  ],
});

const MovieModel = mongoose.model("movies", MovieSchema);

export default MovieModel;
