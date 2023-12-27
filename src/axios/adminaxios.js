import axios from 'axios';
const URL = process.env.REACT_APP_BASE_URL

const local = localStorage.getItem('auth')
let token
let refresh
let localAuth

if(local){
  console.log(local,"hujjhj");
   localAuth = JSON.parse(local)
   token= localAuth?.accessToken
   refresh = localAuth?.refreshToken
}


const refreshAccessToken = async () => {

  try {
    const response = await axios.post(`${URL}auth/refresh`, {
      refreshToken: refresh,
    });


    const newAccessToken = response.data.access_token;

    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

    return response.data;
  } catch (error) {
    if (error?.response?.data?.status === 401 && error?.response?.data?.message === 333) {
      await localStorage.removeItem("auth");
      await window?.location.reload()
    }
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        localStorage.setItem("auth", JSON.stringify(newAccessToken));
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken?.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance