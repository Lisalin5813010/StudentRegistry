// src/services/Api.js
// Ensure that Axios is configured correctly in your Vue.js project to make requests to the Spring Boot API.
import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081/api'
  });
};
