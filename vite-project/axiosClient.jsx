import axios from "axios";
import Cookies from "js-cookie";
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const csrfToken = Cookies.get("XSRF-TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        try {
            const { response } = error;
            if (response && response.status === 401) {
                localStorage.getItem("ACCESS_TOKEN");
            }
        } catch (err) {
            console.log(err);
        }

        throw error;
    }
);

export default axiosClient;
