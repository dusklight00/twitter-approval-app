import axios from "axios";

const instance = axios.create({
  baseURL: "https://twitter-approval-app-production-28af.up.railway.app",
});

export default instance;
