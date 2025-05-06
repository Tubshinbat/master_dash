import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1003/api/v1/",
  // baseURL: "https://admin.node.mn/api/",
});

instance.defaults.withCredentials = true;

export default instance;
