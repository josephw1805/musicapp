import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHadler } from "./middlewares/errorMiddleware.js";
import userRouter from "./Routes/UserRouter.js";
import songsRouter from "./Routes/SongsRouter.js";
import albumsRouter from "./Routes/AlbumsRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// connect to DB
connectDB();

// Main route
app.get("/", (req, res) => {
  res.send("API is running...");
});
// other routes
app.use("/api/users", userRouter);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);

// error handling middleware
app.use(errorHadler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in http://localhost/${PORT}`)
);
