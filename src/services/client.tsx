import axios from 'axios';
import queryString from 'query-string';

export const baseUrl = "http://localhost:1234/api/v2"

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: params => {
    console.log("queryString = ", queryString.stringify({ params }))
    return queryString.stringify({ params })
  }
})

axiosClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    }
  }
})

axiosClient.interceptors.response.use(response => {
  if (response && response.data && response.data.data) {
    return response.data.data;
  }
  if (response && response.data && (response.data.data == null)) {
    return null;
  }
  if (response && response.data) {
    return response.data;
  }
  return response;
}, err => {
  if (!err.response) {
    console.log("response = ", err.response);
  }
  throw err.response;
})

export default axiosClient;