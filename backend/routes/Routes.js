import express from "express";
import MovieController from "../controllers/MovieController.js";
import UserController from "../controllers/UserController.js";

const Routes = express.Router();

Routes.get("/movie", MovieController.GetAll);
Routes.delete("/movie/:id", MovieController.DeleteMovie);
Routes.post("/movie", MovieController.PushMovie);
Routes.patch("/movie/:id", MovieController.PushComment);
Routes.patch("/movie/count/:id", MovieController.UpdateCount);

Routes.post("/user", UserController.Register);
Routes.get("/user", UserController.GetAll);
Routes.get("/user/:id", UserController.GetById);
Routes.patch("/user/:id", UserController.PushComment);
Routes.delete("/user/:id", UserController.DeleteUser);
Routes.patch("/user/rank/:id", UserController.UpdateRank);
Routes.patch("/user/count/:id", UserController.UpdateCount);

export default Routes;
