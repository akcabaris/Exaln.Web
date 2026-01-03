import axios from 'axios';

const PUBLIC_ENDPOINTS = ['/auth/login', '/auth/register'];

const api = axios.create({
    baseURL: 'http://localhost:5119/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((p) => {
        if (error) p.reject(error);
        else p.resolve(token);
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest.headers.Authorization || PUBLIC_ENDPOINTS.some(item => originalRequest.url.includes(item))) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((newToken) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                const refreshResult = await axios.post(
                    'https://localhost:7096/api/auth/refresh',
                    {},
                    { withCredentials: true }
                );

                const newToken = refreshResult.data.token;

                localStorage.setItem('accessToken', newToken);
                api.defaults.headers.Authorization = `Bearer ${newToken}`;

                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem('accessToken');
                window.location.href = '/login';

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
