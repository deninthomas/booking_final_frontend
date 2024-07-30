import axios from "axios";
import httpConfig from "./commonUtils";

const httpClient = axios.create(httpConfig);

httpClient.interceptors.response.use(
  (response) => {
    try {
      // Do something with response data
      return response;
    } catch (error) {
      // Handle response errors
      console.error("Response processing error:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    // Handle response errors
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default httpClient;

export const Post = async (url, req) => {
  try {
    const response = await httpClient.post(url, req);
    if (response.status === 200){
      console.log("start",response.data)
      return { error: false, result: response.data };
     } // Return response data directly
    return { error: true };
    
  } catch (error) {
    // Handle the error
    console.error("Post request error:", error);
    return { error: true };
  }
};
