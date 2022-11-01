import axios from "axios";

const instance = axios.create({
  baseURL: "/.netlify/functions/",
});

export default instance;
