import { getStorage } from "firebase-admin/storage";
import { initializeApp } from "firebase-admin/app";
import dotenv from "dotenv";

dotenv.config();

initializeApp({
  project_id: process.env.PROJECT_ID,
  app_id: process.env.APP_ID,
  storageBucket: process.env.STORAGE_BUCKET,
});

const storage = getStorage().bucket();

export default storage;
