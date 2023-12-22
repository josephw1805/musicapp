import express from "express";
// import { admin, protect } from "../middlewares/Auth.js";
import { importSongs } from "../Controllers/songsController.js";

const router = express.Router();

// ******** PUBLIC ROUTES ********
router.post("/import", importSongs);

// ******** PRIVATE ROUTES ********

// ******** ADMIN ROUTER ********

export default router;
