import axios from "axios";
import { setSessionExpired } from "./redux/slices/authSlice";

const apiUrl= import.meta.env.VITE_API_URL;
let store;


 export const injectStore = _store => {
  store = _store
}

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers:{
      "Content-Type":"application/json",
    },
    withCredentials:true,
   
  });

  axiosClient.interceptors.request.use(
    function (config) {
     
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );


  axiosClient.interceptors.response.use(
    function (response) {
      if(response.data.token){
        localStorage.setItem("token",response.data.token);
      }
      return response;
    },
    function (error) {
     
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        store.dispatch(setSessionExpired());
      }
      return Promise.reject(error);
    }
  );
  
export default axiosClient;