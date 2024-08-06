import axios from "axios";

const apiUrl= import.meta.env.VITE_API_URL;

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
      return response;
    },
    function (error) {
     
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location = '/login';
      }
      return Promise.reject(error);
    }
  );
  
export default axiosClient;