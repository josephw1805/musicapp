import express from "express";
import { admin, protect } from "../middlewares/Auth.js";
import * as albumsController from "../Controllers/AlbumsController.js";

const router = express.Router();

// ******** PUBLIC ROUTES ********
router.get("/", albumsController.getAlbums);

// ******** ADMIN ROUTER ********
router.post("/", protect, admin, albumsController.createAlbum);
router.put("/:id", protect, admin, albumsController.updateAlbum);
router.delete("/:id", protect, admin, albumsController.deleteAlbum);

export default router;
