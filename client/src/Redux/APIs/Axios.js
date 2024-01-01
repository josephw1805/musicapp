import axios from "axios";

const Axios = axios.create({
  baseURL: "https://musicapp-server-7bbd2ekgc-josephw1805.vercel.app/api",
});

export default Axios;
