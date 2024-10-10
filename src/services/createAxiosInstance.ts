import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Axios instance oluşturma işlevi
const createAxiosInstance = (baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
    });

    // Request interceptor
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // Content-Type'ı manuel olarak ayarlamak yerine, Axios'un otomatik olarak belirlemesine izin veriyoruz
            // Bu sayede verinin türüne göre (JSON, FormData, vb.) uygun Content-Type otomatik olarak seçilir
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default createAxiosInstance;
