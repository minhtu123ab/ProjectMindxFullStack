import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nameRegister: String,
  useNameRegister: String,
  passwordRegister: String,
  passwordRegisterAgain: String,
  count: Number,
  rank: String,
  cmt: [
    {
      id: Number,
      movieName: String,
      content: String,
    },
  ],
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
