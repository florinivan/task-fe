import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false,
  accesscontrolalloworigin: "*",
  accesscontrolallowMethods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
});

export default instance;