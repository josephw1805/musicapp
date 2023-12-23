import { getStorage } from "firebase-admin/storage";
import { initializeApp, cert } from "firebase-admin/app";
import dotenv from "dotenv";

dotenv.config();

initializeApp({
  credential: cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  }),
  storageBucket: process.env.STORAGE_BUCKET,
});

const storage = getStorage().bucket();

export default storage;
