import axios from "axios";
import httpConfig from "./commonUtils";

const httpClient = axios.create(httpConfig);

httpClient.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
      if (!(request.data instanceof FormData)) {
        request.headers["Content-Type"] = 'application/json';
      }
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    try {
      return response;
    } catch (error) {
      console.error("Response processing error:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default httpClient;

export const Post = async (url, req, isFormData = false) => {
  try {
    const config = {};
    if (isFormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const response = await httpClient.post(url, req, config);
    if (response.status === 200)
      return { error: false, response: response.data }; // Return response data directly
    return { error: true };
  } catch (error) {
    console.error("Post request error:", error);
    return { error: true };
  }
};
export const Put = async (url, req, isFormData = false) => {
  try {
    const config = {};
    if (isFormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const response = await httpClient.put(url, req, config);
    if (response.status === 200)
      return { error: false, response: response.data }; // Return response data directly
    return { error: true };
  } catch (error) {
    console.error("Post request error:", error);
    return { error: true };
  }
};

export const Delete = async (url, req, isFormData = false) => {
  try {
    const config = {};
    if (isFormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const response = await httpClient.delete(url, req, config);
    if (response.status === 200)
      return { error: false, response: response.data }; // Return response data directly
    return { error: true };
  } catch (error) {
    console.error("Post request error:", error);
    return { error: true };
  }
};

export const Get = async (url) => {
  try {
    const response = await httpClient.get(url);
    console.log("data", response);

    if (response.status === 200) return { error: false, data: response.data }; // Return response data directly
    return { error: true };
  } catch (error) {
    console.error("Get request error:", error);
    return { error: true };
  }
};
