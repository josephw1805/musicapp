import express from "express";
import {
  addLikedSong,
  changeUserPassword,
  deleteLikedSongs,
  deleteUser,
  deleteUserProfile,
  getLikedSongs,
  getUsers,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../Controllers/UserController.js";
import { admin, protect } from "../middlewares/Auth.js";

const router = express.Router();

// ******** PUBLIC ROUTES ********
router.post("/", registerUser);
router.post("/login", loginUser);

// ******** PRIVATE ROUTES ********
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedSongs);
router.post("/favorites", protect, addLikedSong);
router.delete("/favorites", protect, deleteLikedSongs);

// ******** ADMIN ROUTER ********
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
