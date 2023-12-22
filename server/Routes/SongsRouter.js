import express from "express";
import { admin, protect } from "../middlewares/Auth.js";
import * as songsController from "../Controllers/songsController.js";

const router = express.Router();

// ******** PUBLIC ROUTES ********
router.post("/import", songsController.importSongs);
router.get("/", songsController.getSongs);
router.get("/:id", songsController.getSongById);
router.get("/rated/top", songsController.getTopRatedSongs);
router.get("/random/all", songsController.getRandomSongs);

// ******** PRIVATE ROUTES ********
router.post("/:id/reviews", protect, songsController.createSongReview);

// ******** ADMIN ROUTER ********
router.put("/:id", protect, admin, songsController.updateSong);
router.delete("/:id", protect, admin, songsController.deleteSong);
router.delete("/", protect, admin, songsController.deleteAllSongs);
router.post("/", protect, admin, songsController.createSong);

export default router;
