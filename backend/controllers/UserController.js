import UserModel from "../models/UserModel.js";

const UserController = {
  Register: async (req, res) => {
    try {
      const {
        nameRegister,
        useNameRegister,
        passwordRegister,
        passwordRegisterAgain,
        count,
        rank,
        cmt,
      } = req.body;
      const newUser = {
        nameRegister: req.body.nameRegister,
        useNameRegister: req.body.useNameRegister,
        passwordRegister: req.body.passwordRegister,
        passwordRegisterAgain: req.body.passwordRegisterAgain,
        count: req.body.count,
        rank: req.body.rank,
        cmt: req.body.cmt,
      };

      await UserModel.create(newUser);
      res.status(200).send({
        message: "Successfully",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  GetAll: async (req, res) => {
    try {
      const data = await UserModel.find();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  GetById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await UserModel.findById(id);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  PushComment: async (req, res) => {
    try {
      const { cmt } = req.body;
      const { id } = req.params;
      await UserModel.findByIdAndUpdate(id, { $set: { cmt: cmt } });
      res.status(200).send({
        message: "Success",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  DeleteUser: async (req, res) => {
    try {
      const { id } = req.body;
      await UserModel.findByIdAndDelete(id);
      res.status(200).send({
        message: "Success",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  UpdateRank: async (req, res) => {
    try {
      const { id } = req.params;
      const { rank } = req.body;
      await UserModel.findByIdAndUpdate(id, { rank: rank });
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
      await UserModel.findByIdAndUpdate(id, { count: count });
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

export default UserController;
