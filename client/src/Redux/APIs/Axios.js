import axios from "axios";

const Axios = axios.create({
  baseURL: "https://musicapp-server.vercel.app/api",
});

export default Axios;
